<?php

namespace App\Http\Resources\Member\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MembersResource extends JsonResource {
    public function toArray(Request $request): array {
        unset($request);

        if ($this->activeMember) {
            return [
                'memberId'    => $this->activeMember->member_id,
                'name'        => $this->activeMember->name,
                'jobTitle'    => $this->activeMember->job_title,
                'discord'     => $this->activeMember->discord,
                'twitter'     => $this->activeMember->twitter,
                'github'      => $this->activeMember->github,
                'description' => $this->activeMember->description,
                'thumbnail'   => $this->activeMember->thumbnail,
                'username'    => $this->activeMember->username,
                'roleId'      => $this->ability->role->role_id,
                'roleName'    => $this->ability->role->name,
                'isActive'    => true
            ];
        }

        return [
            'memberId'    => $this->nonActiveMember->member_id,
            'name'        => $this->nonActiveMember->name,
            'jobTitle'    => $this->nonActiveMember->job_title,
            'discord'     => $this->nonActiveMember->discord,
            'twitter'     => $this->nonActiveMember->twitter,
            'github'      => $this->nonActiveMember->github,
            'description' => $this->nonActiveMember->description,
            'thumbnail'   => $this->nonActiveMember->thumbnail,
            'username'    => $this->nonActiveMember->username,
            'roleId'      => $this->ability->role->role_id,
            'roleName'    => $this->ability->role->name,
            'isActive'    => false
        ];
    }
}
