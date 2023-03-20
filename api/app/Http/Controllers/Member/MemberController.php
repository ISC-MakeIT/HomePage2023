<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Http\Resources\Member\User\MembersResource;
use App\Models\Member\ActiveMember;
use Illuminate\Http\JsonResponse;

class MemberController extends Controller {
    public function members(): JsonResponse {
        $activeMembers = ActiveMember::all();

        return MembersResource::collection($activeMembers)->response();
    }
}
