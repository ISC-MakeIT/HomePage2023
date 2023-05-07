<?php

namespace App\Http\Resources\OGP\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OGPResources extends JsonResource
{
    public function toArray(Request $request): array
    {
        unset($request);

        return [
            'url'         => $this['url'],
            'description' => $this['description'],
            'title'       => $this['title'],
            'keywords'    => $this['keywords'],
            'thumbnail'   => $this['thumbnail'],
        ];
    }
}
