<?php

namespace App\Http\Controllers\Member;

use App\Domain\Beans\Member\MemberWithAbility;
use App\Http\Controllers\Controller;
use App\Http\Requests\Member\Admin\ChangePasswordRequest;
use App\Http\Requests\Member\Admin\EditMemberRequest;
use App\Http\Requests\Member\Admin\MemberLoginRequest;
use App\Http\Requests\Member\Admin\RegisterMemberRequest;
use App\Models\Member\ActiveMember;
use App\Models\Member\Member;
use App\Models\Member\NonActiveMember;
use App\Models\Member\Role;
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
        return DB::transaction(function () use ($request) {
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

    public function roles(): JsonResponse {
        $this->authorize('roles', Member::class);

        return response()->json(['roles' => Role::all()->map(function ($role) {
            return $role->toLowerCamelCaseJson();
        })]);
    }

    public function changePassword(ChangePasswordRequest $request): JsonResponse {
        $this->authorize('changePassword', Member::class);

        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();
            /** @var Member */
            $member = Member::with(['activeMember', 'nonActiveMember'])->find(auth()->id());

            if ($member->withActiveMemberIsExistsBy($validatedRequest['oldPassword'])) {
                $activeMember = ActiveMember::find(auth()->id());
                $activeMember->update([
                    'password' => Hash::make($validatedRequest['newPassword'])
                ]);
                return response()->json(['message' => 'パスワードの変更に成功しました。']);
            }
            if ($member->withNonActiveMemberIsExistsBy($validatedRequest['oldPassword'])) {
                $nonActiveMember = NonActiveMember::find(auth()->id());
                $nonActiveMember->update([
                    'password' => Hash::make($validatedRequest['newPassword'])
                ]);
                return response()->json(['message' => 'パスワードの変更に成功しました。']);
            }

            throw new AccessDeniedHttpException('パスワードが違います。');
        });
    }

    public function register(RegisterMemberRequest $request): JsonResponse {
        $this->authorize('register', Member::class);

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

    public function edit(EditMemberRequest $request): JsonResponse {
        $this->authorize('edit', Member::class);

        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $member = Member::doesntHave('archiveMember')
                ->with(['activeMember', 'nonActiveMember'])
                ->find(auth()->id());
            $member->update([
                'updator' => auth()->id()
            ]);
            $member->activeMember()->delete();
            $member->nonActiveMember()->delete();

            if ($validatedRequest['isActive']) {
                ActiveMember::create([
                    'member_id'   => $member->member_id,
                    'name'        => $validatedRequest['name'],
                    'job_title'   => $validatedRequest['jobTitle'],
                    'discord'     => $validatedRequest['discord'],
                    'twitter'     => $validatedRequest['twitter'],
                    'github'      => $validatedRequest['github'],
                    'description' => $validatedRequest['description'],
                    'username'    => $member->activeMember->username,
                    'password'    => $member->activeMember->password,
                    'creator'     => auth()->id(),
                ]);
                return response()->json(['message' => 'メンバーの編集に成功しました。']);
            }

            NonActiveMember::create([
                'member_id'   => $member->member_id,
                'name'        => $validatedRequest['name'],
                'job_title'   => $validatedRequest['jobTitle'],
                'discord'     => $validatedRequest['discord'],
                'twitter'     => $validatedRequest['twitter'],
                'github'      => $validatedRequest['github'],
                'description' => $validatedRequest['description'],
                'username'    => $member->activeMember->username,
                'password'    => $member->activeMember->password,
                'creator'     => auth()->id(),
            ]);
            return response()->json(['message' => 'メンバーの編集に成功しました。']);
        });
    }
}
