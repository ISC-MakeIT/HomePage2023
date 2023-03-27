<?php

namespace App\Http\Controllers\Member;

use App\Domain\Beans\Member\MemberWithAbility;
use App\Http\Controllers\Controller;
use App\Http\Requests\Member\Admin\ChangeActiveRequest;
use App\Http\Requests\Member\Admin\ChangePasswordRequest;
use App\Http\Requests\Member\Admin\ChangeRoleRequest;
use App\Http\Requests\Member\Admin\DeleteMemberRequest;
use App\Http\Requests\Member\Admin\EditMemberIconRequest;
use App\Http\Requests\Member\Admin\EditMemberRequest;
use App\Http\Requests\Member\Admin\MemberLoginRequest;
use App\Http\Requests\Member\Admin\MemberRequest;
use App\Http\Requests\Member\Admin\RegisterMemberRequest;
use App\Http\Resources\Member\Admin\MembersResource;
use App\Http\Resources\Member\Admin\RolesResource;
use App\Models\Member\ActiveMember;
use App\Models\Member\ArchiveMember;
use App\Models\Member\Member;
use App\Models\Member\MemberAbility;
use App\Models\Member\NonActiveMember;
use App\Models\Member\Role;
use Carbon\CarbonImmutable;
use Illuminate\Http\File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Intervention\Image\Facades\Image as InterventionImage;

class AdminMemberController extends Controller {
    public function login(MemberLoginRequest $request): JsonResponse {
        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $activeMember = ActiveMember::getActiveMemberIfCanLogin($validatedRequest['username'], $validatedRequest['password']);
            if ($activeMember) {
                return response()->json([
                    'token'   => Member::find($activeMember->member_id)->createToken(config('app.key'))->plainTextToken,
                    'message' => 'ログインに成功しました。',
                ]);
            }

            $nonActiveMember = NonActiveMember::getNonActiveMemberIfCanLogin($validatedRequest['username'], $validatedRequest['password']);
            if ($nonActiveMember) {
                return response()->json([
                    'token'   => Member::find($nonActiveMember->member_id)->createToken(config('app.key'))->plainTextToken,
                    'message' => 'ログインに成功しました。',
                ]);
            }

            throw new AccessDeniedHttpException('ユーザー名かパスワードが違います。');
        });
    }

    public function logout(Request $request): JsonResponse {
        return DB::transaction(function () use ($request) {
            $currentToken = $request->bearerToken();

            Member::find(auth()->id())->deleteTokensBy($currentToken);
            return response()->json([
                'message' => 'ログアウトに成功しました。',
            ]);
        });
    }

    public function roles(): JsonResponse {
        $this->authorize('roles', Member::class);

        return RolesResource::collection(Role::all())->response();
    }

    public function changeRole(ChangeRoleRequest $request): JsonResponse {
        $this->authorize('changeRole', Member::class);

        $validatedRequest = $request->validated();

        DB::transaction(function () use ($validatedRequest) {
            $memberAbility = MemberAbility::where('member_id', $validatedRequest['memberId'])->first();
            $memberAbility->update([
                'role_id' => $validatedRequest['roleId'],
                'updator' => auth()->id()
            ]);
        });

        return response()->json(['message' => 'ロールの変更に成功しました。']);
    }

    public function changeActive(ChangeActiveRequest $request): JsonResponse {
        $this->authorize('changeActive', Member::class);

        $validatedRequest  = $request->validated();

        return DB::transaction(function () use ($validatedRequest) {
            $member = Member::doesntHave('archiveMember')
                ->with(['activeMember', 'nonActiveMember'])
                ->findOrFail($validatedRequest['memberId']);

            $member->activeMember()->delete();
            $member->nonActiveMember()->delete();

            $memberContent = [];

            if ($member->activeMember) {
                $memberContent = [
                    'member_id'   => $member->member_id,
                    'name'        => $member->activeMember->name,
                    'job_title'   => $member->activeMember->job_title,
                    'discord'     => $member->activeMember->discord,
                    'twitter'     => $member->activeMember->twitter,
                    'github'      => $member->activeMember->github,
                    'description' => $member->activeMember->description,
                    'thumbnail'   => $member->activeMember->thumbnail,
                    'username'    => $member->activeMember->username,
                    'password'    => $member->activeMember->password,
                    'creator'     => auth()->id(),
                ];
            }
            if ($member->nonActiveMember) {
                $memberContent = [
                    'member_id'   => $member->member_id,
                    'name'        => $member->nonActiveMember->name,
                    'job_title'   => $member->nonActiveMember->job_title,
                    'discord'     => $member->nonActiveMember->discord,
                    'twitter'     => $member->nonActiveMember->twitter,
                    'github'      => $member->nonActiveMember->github,
                    'description' => $member->nonActiveMember->description,
                    'thumbnail'   => $member->nonActiveMember->thumbnail,
                    'username'    => $member->nonActiveMember->username,
                    'password'    => $member->nonActiveMember->password,
                    'creator'     => auth()->id(),
                ];
            }

            if ($validatedRequest['isActive']) {
                ActiveMember::create($memberContent);
                return response()->json(['message' => '表示状態の変更に成功しました。']);
            }

            NonActiveMember::create($memberContent);
            return response()->json(['message' => '表示状態の変更に成功しました。']);
        });
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

            $now                     = date_format(CarbonImmutable::now(), 'YmdHis');
            $name                    = $request->file('icon')->getClientOriginalName();
            $tmpFileName             = "/tmp/{$now}_{$name}";
            $tmpFileNameForThumbnail = $tmpFileName . '_thumbnail';

            InterventionImage::make($request->file('icon'))->save($tmpFileNameForThumbnail, 20, 'jpg');
            InterventionImage::make($request->file('icon'))->save($tmpFileName, 80, 'jpg');

            /** @var \Illuminate\Filesystem\FilesystemAdapter */
            $s3Storage = Storage::disk('s3');

            $filePath         = $s3Storage->putFile('image/icons/thumbnail', new File($tmpFileNameForThumbnail), 'public');
            $explodedFilePath = explode('/', $filePath);
            $fileName         = $explodedFilePath[count($explodedFilePath) - 1];
            $s3Storage->putFileAs('image/icons', new File($tmpFileName), $fileName, 'public');

            Member::createMemberWithAbility(MemberWithAbility::from(
                $validatedRequest['name'],
                $validatedRequest['jobTitle'],
                $validatedRequest['discord'],
                $validatedRequest['twitter'],
                $validatedRequest['github'],
                $validatedRequest['description'],
                $s3Storage->url($filePath),
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

            if ($member->activeMember) {
                if ($validatedRequest['isActive']) {
                    ActiveMember::create([
                        'member_id'   => $member->member_id,
                        'name'        => $validatedRequest['name'],
                        'job_title'   => $validatedRequest['jobTitle'],
                        'discord'     => $validatedRequest['discord'],
                        'twitter'     => $validatedRequest['twitter'],
                        'github'      => $validatedRequest['github'],
                        'description' => $validatedRequest['description'],
                        'thumbnail'   => $member->activeMember->thumbnail,
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
                    'thumbnail'   => $member->activeMember->thumbnail,
                    'username'    => $member->activeMember->username,
                    'password'    => $member->activeMember->password,
                    'creator'     => auth()->id(),
                ]);
                return response()->json(['message' => 'メンバーの編集に成功しました。']);
            }

            if ($validatedRequest['isActive']) {
                ActiveMember::create([
                    'member_id'   => $member->member_id,
                    'name'        => $validatedRequest['name'],
                    'job_title'   => $validatedRequest['jobTitle'],
                    'discord'     => $validatedRequest['discord'],
                    'twitter'     => $validatedRequest['twitter'],
                    'github'      => $validatedRequest['github'],
                    'description' => $validatedRequest['description'],
                    'thumbnail'   => $member->nonActiveMember->thumbnail,
                    'username'    => $member->nonActiveMember->username,
                    'password'    => $member->nonActiveMember->password,
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
                'thumbnail'   => $member->nonActiveMember->thumbnail,
                'username'    => $member->nonActiveMember->username,
                'password'    => $member->nonActiveMember->password,
                'creator'     => auth()->id(),
            ]);
            return response()->json(['message' => 'メンバーの編集に成功しました。']);
        });
    }

    public function editIcon(EditMemberIconRequest $request): JsonResponse {
        $this->authorize('editIcon', Member::class);

        return DB::transaction(function () use ($request) {
            $member = Member::doesntHave('archiveMember')
                ->with(['activeMember', 'nonActiveMember'])
                ->find(auth()->id());
            $member->update([
                'updator' => auth()->id()
            ]);
            $member->activeMember()->delete();
            $member->nonActiveMember()->delete();

            $now                     = date_format(CarbonImmutable::now(), 'YmdHis');
            $name                    = $request->file('icon')->getClientOriginalName();
            $tmpFileName             = "/tmp/{$now}_{$name}";
            $tmpFileNameForThumbnail = $tmpFileName . '_thumbnail';

            /** @var \Illuminate\Filesystem\FilesystemAdapter */
            $s3Storage = Storage::disk('s3');

            $filePath         = $s3Storage->putFile('image/icons/thumbnail', new File($tmpFileNameForThumbnail), 'public');
            $explodedFilePath = explode('/', $filePath);
            $fileName         = $explodedFilePath[count($explodedFilePath) - 1];
            $s3Storage->putFileAs('image/icons', new File($tmpFileName), $fileName, 'public');

            if ($member->activeMember) {
                ActiveMember::create([
                    'member_id'   => $member->activeMember->member_id,
                    'name'        => $member->activeMember->name,
                    'job_title'   => $member->activeMember->job_title,
                    'discord'     => $member->activeMember->discord,
                    'twitter'     => $member->activeMember->twitter,
                    'github'      => $member->activeMember->github,
                    'description' => $member->activeMember->description,
                    'thumbnail'   => $s3Storage->url($filePath),
                    'username'    => $member->activeMember->username,
                    'password'    => $member->activeMember->password,
                    'creator'     => auth()->id()
                ]);
                return response()->json(['message' => 'メンバーの編集に成功しました。']);
            }
            if ($member->nonActiveMember) {
                NonActiveMember::create([
                    'member_id'   => $member->nonActiveMember->member_id,
                    'name'        => $member->nonActiveMember->name,
                    'job_title'   => $member->nonActiveMember->job_title,
                    'discord'     => $member->nonActiveMember->discord,
                    'twitter'     => $member->nonActiveMember->twitter,
                    'github'      => $member->nonActiveMember->github,
                    'description' => $member->nonActiveMember->description,
                    'thumbnail'   => $s3Storage->url($filePath),
                    'username'    => $member->nonActiveMember->username,
                    'password'    => $member->nonActiveMember->password,
                    'creator'     => auth()->id()
                ]);
                return response()->json(['message' => 'メンバーの削除に成功しました。']);
            }

            return response()->json(['message' => '予期しないエラーです。'], 500);
        });
    }

    public function delete(DeleteMemberRequest $request): JsonResponse {
        $this->authorize('delete', Member::class);

        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $member = Member::doesntHave('archiveMember')
                ->with(['activeMember', 'nonActiveMember'])
                ->findOrFail($validatedRequest['memberId']);
            $member->activeMember()->delete();
            $member->nonActiveMember()->delete();

            if ($member->activeMember) {
                ArchiveMember::create([
                    'member_id'   => $member->activeMember->member_id,
                    'name'        => $member->activeMember->name,
                    'job_title'   => $member->activeMember->job_title,
                    'discord'     => $member->activeMember->discord,
                    'twitter'     => $member->activeMember->twitter,
                    'github'      => $member->activeMember->github,
                    'description' => $member->activeMember->description,
                    'thumbnail'   => $member->activeMember->thumbnail,
                    'username'    => $member->activeMember->username,
                    'password'    => $member->activeMember->password,
                    'creator'     => auth()->id()
                ]);
                return response()->json(['message' => 'メンバーの削除に成功しました。']);
            }
            if ($member->nonActiveMember) {
                ArchiveMember::create([
                    'member_id'   => $member->nonActiveMember->member_id,
                    'name'        => $member->nonActiveMember->name,
                    'job_title'   => $member->nonActiveMember->job_title,
                    'discord'     => $member->nonActiveMember->discord,
                    'twitter'     => $member->nonActiveMember->twitter,
                    'github'      => $member->nonActiveMember->github,
                    'description' => $member->nonActiveMember->description,
                    'thumbnail'   => $member->nonActiveMember->thumbnail,
                    'username'    => $member->nonActiveMember->username,
                    'password'    => $member->nonActiveMember->password,
                    'creator'     => auth()->id()
                ]);
                return response()->json(['message' => 'メンバーの削除に成功しました。']);
            }
            return response()->json(['message' => '予期しないエラーです。'], 500);
        });
    }

    public function members(): JsonResponse {
        $this->authorize('members', Member::class);

        $members = Member::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->get();

        return MembersResource::collection($members)->response();
    }

    public function member(MemberRequest $request): array {
        $this->authorize('member', Member::class);

        $validatedRequest = $request->validated();
        $member           = Member::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->findOrFail($validatedRequest['memberId']);

        return MembersResource::make($member)->toArray($request);
    }
}
