<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Resources\Member\Admin\MemberResource;
use App\Http\Response\Response;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;

class FindMeResponse
{
    public static function success(MemberBean $memberBean)
    {
        return Response::success(
            '自身の取得に成功しました。',
            MemberResource::make($memberBean),
        );
    }
}
