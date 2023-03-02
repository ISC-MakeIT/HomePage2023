<?php

namespace App\Http\Resources\Member\Admin;

use Carbon\CarbonImmutable;
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
                'createdAt' => (new CarbonImmutable($this->created_at))->toIsoString(),
                'updatedAt' => (new CarbonImmutable($this->activeWork->created_at))->toIsoString(),
                'isActive'  => true,
            ];
        }

        return [
            'workId'    => $this->nonActiveWork->work_id,
            'title'     => $this->nonActiveWork->title,
            'contents'  => $this->nonActiveWork->contents,
            'version'   => $this->version,
            'createdAt' => (new CarbonImmutable($this->created_at))->toIsoString(),
            'updatedAt' => (new CarbonImmutable($this->nonActiveWork->created_at))->toIsoString(),
            'isActive'  => false,
        ];
    }
}
