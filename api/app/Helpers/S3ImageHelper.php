<?php

namespace App\Helpers;

use App\Exceptions\Helpers\IllegalPathException;
use Carbon\CarbonImmutable;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as InterventionImage;

class S3ImageHelper {
    public static function putImageWithThumbnail(UploadedFile $image, string $path): string {
        $explodedPath = explode('/', $path);
        if ($explodedPath[count($explodedPath) - 1] !== 'thumbnail') {
            throw new IllegalPathException('thumbnailがpathに含まれていません。', 1);
        }

        $now                     = date_format(CarbonImmutable::now(), 'YmdHis');
        $name                    = str_replace(' ', '_', $image->getClientOriginalName());
        $tmpFileName             = "/tmp/{$now}_{$name}";
        $tmpFileNameForThumbnail = $tmpFileName . '_thumbnail';

        InterventionImage::make($image)->save($tmpFileNameForThumbnail, 20, 'jpg');
        InterventionImage::make($image)->save($tmpFileName, 80, 'jpg');

        /** @var \Illuminate\Filesystem\FilesystemAdapter */
        $s3Storage = Storage::disk('s3');

        $filePath         = $s3Storage->putFile($path, new File($tmpFileNameForThumbnail), 'public');
        $explodedFilePath = explode('/', $filePath);
        $fileName         = $explodedFilePath[count($explodedFilePath) - 1];
        $s3Storage->putFileAs(str_replace('/thumbnail', '', $path), new File($tmpFileName), $fileName, 'public');

        return $s3Storage->url($filePath);
    }

    public static function putImage(UploadedFile $image, string $path, int $quality = 80): string {
        $now                     = date_format(CarbonImmutable::now(), 'YmdHis');
        $name                    = str_replace(' ', '_', $image->getClientOriginalName());
        $tmpFileName             = "/tmp/{$now}_{$name}";

        InterventionImage::make($image)->save($tmpFileName, $quality, 'jpg');

        /** @var \Illuminate\Filesystem\FilesystemAdapter */
        $s3Storage = Storage::disk('s3');

        $filePath = $s3Storage->putFile($path, new File($tmpFileName), 'public');
        return $s3Storage->url($filePath);
    }
}
