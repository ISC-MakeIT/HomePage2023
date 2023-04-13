<?php

namespace App\Http\Resources\Member\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MembersResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'memberId'    => $this->member_id,
            'name'        => $this->name,
            'jobTitle'    => $this->job_title,
            'discord'     => $this->discord,
            'twitter'     => $this->twitter,
            'github'      => $this->github,
            'description' => $this->description,
            'thumbnail'   => $this->thumbnail,
        ];
    }
}
