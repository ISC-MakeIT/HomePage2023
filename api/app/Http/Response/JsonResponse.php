<?php

namespace App\Http\Response;

use Illuminate\Http\JsonResponse as OriginJsonResponse;

class JsonResponse extends OriginJsonResponse
{
    public function toArray(): array
    {
        return json_decode($this->content(), true, 512, JSON_THROW_ON_ERROR);
    }
}
