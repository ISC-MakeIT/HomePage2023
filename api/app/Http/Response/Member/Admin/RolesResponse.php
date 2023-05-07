<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Resources\Member\Admin\RoleResource;
use App\Http\Response\Response;
use MakeIT\Role\Domain\Bean\Role;

class RolesResponse
{
    /**
     * @param array<Role> $roles
     */
    public static function success(array $roles)
    {
        return Response::success(
            'ロールの取得に成功しました。',
            RoleResource::collection($roles)
        );
    }
}
