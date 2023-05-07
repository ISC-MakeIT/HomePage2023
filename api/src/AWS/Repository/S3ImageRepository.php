<?php

namespace MakeIT\AWS\Repository;

use Carbon\CarbonImmutable;
use Illuminate\Http\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use MakeIT\AWS\Domain\Bean\PutImageBean;
use MakeIT\AWS\Domain\Bean\S3ImageBean;

class S3ImageRepository implements \MakeIT\AWS\Repository\Interface\S3ImageRepository
{
    public function putImage(PutImageBean $putImageBean): S3ImageBean
    {
        $now                     = date_format(CarbonImmutable::now(), 'YmdHis');
        $name                    = str_replace(' ', '_', Str::random(24));
        $tmpFileName             = "/tmp/{$now}_{$name}";
        $tmpFileNameForThumbnail = $tmpFileName . '_thumbnail';

        $putImageBean->getImage()->save($tmpFileNameForThumbnail, $putImageBean->getQuality(), 'jpg');
        $putImageBean->getImage()->save($tmpFileName, $putImageBean->getQuality(), 'jpg');

        /** @var \Illuminate\Filesystem\FilesystemAdapter */
        $s3Storage = Storage::disk('s3');

        $thumbnailFilePath          = $s3Storage->putFile(
            $putImageBean->getImagePath()->toString(),
            new File($tmpFileNameForThumbnail),
            'public'
        );
        $explodedThumbnailFilePath  = explode('/', $thumbnailFilePath);
        $thumbnailFileName          = $explodedThumbnailFilePath[count($explodedThumbnailFilePath) - 1];

        $imageFilePath = $s3Storage->putFileAs(
            $putImageBean->getThumbnailPath()->toString(),
            new File($tmpFileName),
            $thumbnailFileName,
            'public'
        );

        return S3ImageBean::from(
            $s3Storage->url($imageFilePath),
            $s3Storage->url($thumbnailFileName),
        );
    }
}
