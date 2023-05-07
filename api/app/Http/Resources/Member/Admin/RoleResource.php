<?php

namespace App\Http\Resources\Member\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        unset($request);

        return [
            'roleId' => $this->getRoleId(),
            'name'   => $this->getName(),
        ];
    }
}
