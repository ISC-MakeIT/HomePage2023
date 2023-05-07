<?php

namespace App\Http\Resources\Member\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        unset($request);

        return [
            'memberId'    => $this->getMemberId(),
            'name'        => $this->getName(),
            'jobTitle'    => $this->getJobTitle(),
            'discord'     => $this->getDiscord(),
            'twitter'     => $this->getTwitter(),
            'github'      => $this->getGithub(),
            'description' => $this->getDescription(),
            'thumbnail'   => $this->getThumbnail(),
            'username'    => $this->getUsername(),
            'version'     => $this->getVersion(),
            'isActive'    => $this->getIsActive(),
            'roleId'      => $this->getRole()->getRoleId(),
            'roleName'    => $this->getRole()->getName(),
            'creator'     => $this->getCreator(),
            'updator'     => $this->getUpdator()
        ];
    }
}
