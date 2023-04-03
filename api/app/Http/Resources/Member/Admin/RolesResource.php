<?php

namespace App\Http\Resources\Member\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RolesResource extends JsonResource {
    public function toArray(Request $request): array {
        unset($request);

        return [
            'roleId' => $this->role_id,
            'name'   => $this->name,
        ];
    }
}
