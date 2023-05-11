<?php

namespace MakeIT\AWS\Repository;

use Carbon\CarbonImmutable;
use Illuminate\Http\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use MakeIT\AWS\Domain\Bean\PutImageBean;
use MakeIT\AWS\Domain\Bean\S3ImageBean;

class DummyS3ImageRepository implements \MakeIT\AWS\Repository\Interface\S3ImageRepository
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
        $storage = Storage::disk('public');

        $thumbnailFilePath          = $storage->putFile(
            $putImageBean->getImagePath()->toString(),
            new File($tmpFileNameForThumbnail),
        );
        $explodedThumbnailFilePath  = explode('/', $thumbnailFilePath);
        $thumbnailFileName          = $explodedThumbnailFilePath[count($explodedThumbnailFilePath) - 1];

        $imageFilePath = $storage->putFileAs(
            $putImageBean->getThumbnailPath()->toString(),
            new File($tmpFileName),
            $thumbnailFileName,
        );

        return S3ImageBean::from(
            $storage->url($imageFilePath),
            $storage->url($thumbnailFileName),
        );
    }
}
