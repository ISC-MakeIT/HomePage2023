<?php

namespace MakeIT\AWS\Repository\Interface;

use MakeIT\AWS\Domain\Bean\PutImageBean;
use MakeIT\AWS\Domain\Bean\S3ImageBean;

interface S3ImageRepository
{
    public function putImage(PutImageBean $putImageBean): S3ImageBean;
}
