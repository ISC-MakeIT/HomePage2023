<?php

namespace App\Http\Resources\Member\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        unset($request);

        return [
            'token'    => $this->getToken(),
            'memberId' => $this->getMember()->getMemberId(),
        ];
    }
}
