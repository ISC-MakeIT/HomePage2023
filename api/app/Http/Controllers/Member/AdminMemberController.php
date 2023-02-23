<?php

namespace App\Http\Controllers\Member;

use App\Domain\Beans\Member\MemberWithAbility;
use App\Http\Controllers\Controller;
use App\Http\Requests\Member\Admin\MemberLoginRequest;
use App\Http\Requests\Member\Admin\RegisterMemberRequest;
use App\Models\Member\ActiveMember;
use App\Models\Member\Member;
use App\Models\Member\NonActiveMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class AdminMemberController extends Controller {
    public function login(MemberLoginRequest $request): JsonResponse {
        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $activeMember = ActiveMember::getActiveMemberIfCanLogin($validatedRequest['username'], $validatedRequest['password']);
            if ($activeMember) {
                return response()->json([
                    'token'   => $activeMember->createToken(config('app.key'))->plainTextToken,
                    'message' => 'ログインに成功しました。',
                ]);
            }

            $nonActiveMember = NonActiveMember::getNonActiveMemberIfCanLogin($validatedRequest['username'], $validatedRequest['password']);
            if ($nonActiveMember) {
                return response()->json([
                    'token'   => $nonActiveMember->createToken(config('app.key'))->plainTextToken,
                    'message' => 'ログインに成功しました。',
                ]);
            }

            throw new AccessDeniedHttpException('ユーザー名かパスワードが違います。');
        });
    }

    public function logout(Request $request): JsonResponse {
        return DB::transaction(function() use ($request) {
            $currentToken = $request->bearerToken();

            $activeMember    = ActiveMember::where('member_id', auth()->id())->first();
            $nonActiveMember = NonActiveMember::where('member_id', auth()->id())->first();

            if ($activeMember) {
                $activeMember->deleteTokensBy($currentToken);
            }
            if ($nonActiveMember) {
                $nonActiveMember->deleteTokensBy($currentToken);
            }

            return response()->json([
                'message' => 'ログアウトに成功しました。',
            ]);
        });
    }

    public function register(RegisterMemberRequest $request): JsonResponse {
        DB::transaction(function () use ($request) {
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
                $validatedRequest['roleId'],
                auth()->id(),
                auth()->id(),
            ));
        });

        return response()->json(['message' => 'メンバーの作成に成功しました。'], 201);
    }
}
