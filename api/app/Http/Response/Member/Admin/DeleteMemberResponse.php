<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Response\Response;

class DeleteMemberResponse
{
    public static function success()
    {
        return Response::success(
            'メンバーの削除に成功しました。',
        );
    }
}
