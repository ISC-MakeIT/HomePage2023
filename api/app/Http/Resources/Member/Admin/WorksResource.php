<?php

namespace App\Http\Resources\Member\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorksResource extends JsonResource {
    public function toArray(Request $request): array {
        unset($request);

        if ($this->activeWork) {
            return [
                'workId'    => $this->activeWork->work_id,
                'title'     => $this->activeWork->title,
                'contents'  => $this->activeWork->contents,
                'version'   => $this->version,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->activeWork->created_at,
                'isActive'  => true,
            ];
        }

        return [
            'workId'    => $this->nonActiveWork->work_id,
            'title'     => $this->nonActiveWork->title,
            'contents'  => $this->nonActiveWork->contents,
            'version'   => $this->version,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->nonActiveWork->created_at,
            'isActive'  => false,
        ];
    }
}
