<?php

namespace App\Http\Controllers\Member;

use App\Domain\Beans\Member\MemberWithAbility;
use App\Http\Controllers\Controller;
use App\Http\Requests\Member\Admin\RegisterMemberRequest;
use App\Models\Member\Member;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminMemberController extends Controller {
    public function register(RegisterMemberRequest $request): Response {
        DB::transaction(function() use ($request) {
            $validatedRequest = $request->validated();
            $hashedPassword   = Hash::make($validatedRequest['password']);

            Member::createMemberWithAbility(MemberWithAbility::from(
                $validatedRequest['name'],
                $validatedRequest['jobTitle'],
                $validatedRequest['discord'],
                $validatedRequest['twitter'],
                $validatedRequest['github'],
                $validatedRequest['description'],
                $validatedRequest['username'],
                $hashedPassword,
                $validatedRequest['roleId']
            ));
        });

        return response('メンバーの作成に成功しました。', 201);
    }
}
