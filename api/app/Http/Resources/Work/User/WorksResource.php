<?php

namespace App\Http\Resources\Work\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorksResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'workId'    => $this->work_id,
            'title'     => $this->title,
            'contents'  => $this->contents,
            'thumbnail' => $this->thumbnail,
            'createdAt' => $this->created_at,
        ];
    }
}
