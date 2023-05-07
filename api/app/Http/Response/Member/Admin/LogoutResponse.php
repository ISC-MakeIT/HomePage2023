<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Response\Response;

class LogoutResponse
{
    public static function success()
    {
        return Response::success(
            'ログアウトに成功しました。',
            null
        );
    }
}
