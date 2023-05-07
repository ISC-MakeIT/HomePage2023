<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Resources\Member\Admin\MemberResource;
use App\Http\Response\Response;
use MakeIT\Member\Domain\Bean\MemberBean;

class ChangePasswordResponse
{
    public static function success(MemberBean $memberBean)
    {
        return Response::success(
            'パスワードの変更に成功しました。',
            MemberResource::make($memberBean)
        );
    }
}
