<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Response\Response;
use MakeIT\Member\Domain\Bean\MemberBean;

class DeleteMemberResponse
{
    public static function success()
    {
        return Response::success(
            'メンバーの削除に成功しました。',
        );
    }
}
