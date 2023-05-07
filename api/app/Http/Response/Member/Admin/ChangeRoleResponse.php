<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Resources\Member\Admin\MemberResource;
use App\Http\Response\Response;
use MakeIT\Member\Domain\Bean\MemberBean;

class ChangeRoleResponse
{
    public static function success(MemberBean $memberBean)
    {
        return Response::success(
            'ロールの変更に成功しました。',
            MemberResource::make($memberBean)
        );
    }
}
