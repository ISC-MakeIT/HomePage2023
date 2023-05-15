<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Resources\Member\Admin\MemberResource;
use App\Http\Response\Response;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;

class ChangeActivityResponse
{
    public static function success(MemberBean $memberBean)
    {
        return Response::success(
            '表示状態の変更に成功しました。',
            MemberResource::make($memberBean)
        );
    }
}
