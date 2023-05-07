<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Resources\Member\Admin\LoginResource;
use App\Http\Response\Response;
use MakeIT\Member\Domain\Bean\MemberWithTokenBean;

class LoginResponse
{
    public static function success(MemberWithTokenBean $memberWithTokenBean)
    {
        return Response::success(
            'ログインに成功しました。',
            LoginResource::make($memberWithTokenBean)
        );
    }
}
