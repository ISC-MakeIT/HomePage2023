<?php

namespace App\Http\Response\Member\Admin;

use App\Http\Resources\Member\Admin\MemberResource;
use App\Http\Response\Response;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;

class FindAllMemberResponse
{
    /**
     * @param array<MemberBean> $members
     */
    public static function success(array $members)
    {
        return Response::success(
            'メンバー一覧の取得に成功しました。',
            MemberResource::collection($members),
        );
    }
}
