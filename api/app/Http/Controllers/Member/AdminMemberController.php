<?php

namespace App\Http\Controllers\Member;

use App\Domain\Beans\Member\MemberWithAbility;
use App\Domain\ValueObjects\Helpers\S3Path;
use App\Helpers\S3ImageHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Member\Admin\ChangeActivityRequest;
use App\Http\Requests\Member\Admin\ChangePasswordRequest;
use App\Http\Requests\Member\Admin\ChangeRoleRequest;
use App\Http\Requests\Member\Admin\DeleteMemberRequest;
use App\Http\Requests\Member\Admin\EditMemberIconRequest;
use App\Http\Requests\Member\Admin\EditMemberRequest;
use App\Http\Requests\Member\Admin\MemberLoginRequest;
use App\Http\Requests\Member\Admin\MemberRequest;
use App\Http\Requests\Member\Admin\RegisterMemberRequest;
use App\Http\Resources\Member\Admin\MembersResource;
use App\Http\Response\Member\Admin\ChangeActivityResponse;
use App\Http\Response\Member\Admin\ChangePasswordResponse;
use App\Http\Response\Member\Admin\ChangeRoleResponse;
use App\Http\Response\Member\Admin\EditMemberResponse;
use App\Http\Response\Member\Admin\LoginResponse;
use App\Http\Response\Member\Admin\LogoutResponse;
use App\Http\Response\Member\Admin\RegisterMemberResponse;
use App\Http\Response\Member\Admin\RolesResponse;
use App\Models\Member\ActiveMember;
use App\Models\Member\ArchiveMember;
use App\Models\Member\Member;
use App\Models\Member\NonActiveMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Service\Command\ChangeMemberActivityService;
use MakeIT\Member\Service\Command\ChangeMemberPasswordService;
use MakeIT\Member\Service\Command\ChangeMemberRoleService;
use MakeIT\Member\Service\Command\EditMemberService;
use MakeIT\Member\Service\Command\LoginService;
use MakeIT\Member\Service\Command\LogoutService;
use MakeIT\Member\Service\Command\RegisterMemberService;
use MakeIT\Role\Service\Query\RolesService;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class AdminMemberController extends Controller
{
    private LoginService $loginService;
    private LogoutService $logoutService;
    private RolesService $rolesService;
    private ChangeMemberRoleService $changeMemberRoleService;
    private ChangeMemberActivityService $changeMemberActivityService;
    private ChangeMemberPasswordService $changeMemberPasswordService;
    private RegisterMemberService $registerMemberService;
    private EditMemberService $editMemberService;

    public function __construct(
        LoginService $loginService,
        LogoutService $logoutService,
        RolesService $rolesService,
        ChangeMemberRoleService $changeMemberRoleService,
        ChangeMemberActivityService $changeMemberActivityService,
        ChangeMemberPasswordService $changeMemberPasswordService,
        RegisterMemberService $registerMemberService,
        EditMemberService $editMemberService,
    ) {
        $this->loginService                = $loginService;
        $this->logoutService               = $logoutService;
        $this->rolesService                = $rolesService;
        $this->changeMemberRoleService     = $changeMemberRoleService;
        $this->changeMemberActivityService = $changeMemberActivityService;
        $this->changeMemberPasswordService = $changeMemberPasswordService;
        $this->registerMemberService       = $registerMemberService;
        $this->editMemberService           = $editMemberService;
    }

    public function login(MemberLoginRequest $request): JsonResponse
    {
        $memberWithTokenBean = $this->loginService->execute($request->toBean());

        return LoginResponse::success($memberWithTokenBean);
    }

    public function logout(Request $request): JsonResponse
    {
        $currentToken = $request->bearerToken();

        $this->logoutService->execute($currentToken);

        return LogoutResponse::success();
    }

    public function roles(): JsonResponse
    {
        $this->authorize('roles', Member::class);

        $roles = $this->rolesService->execute();

        return RolesResponse::success($roles);
    }

    public function changeRole(ChangeRoleRequest $request): JsonResponse
    {
        $this->authorize('changeRole', Member::class);

        $latestMember = $this->changeMemberRoleService->execute($request->toDomain());

        return ChangeRoleResponse::success($latestMember);
    }

    public function changeActivity(ChangeActivityRequest $request): JsonResponse
    {
        $this->authorize('changeActivity', Member::class);

        $latestMember = $this->changeMemberActivityService->execute($request->toDomain());

        return ChangeActivityResponse::success($latestMember);
    }

    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        $this->authorize('changePassword', Member::class);

        $latestMember = $this->changeMemberPasswordService->execute($request->toDomain());

        return ChangePasswordResponse::success($latestMember);
    }

    public function register(RegisterMemberRequest $request): JsonResponse
    {
        $this->authorize('register', Member::class);

        $registeredMember = $this->registerMemberService->execute($request->toDomain());

        return RegisterMemberResponse::success($registeredMember);
    }

    public function edit(EditMemberRequest $request): JsonResponse
    {
        $this->authorize('edit', Member::class);

        $editedMember = $this->editMemberService->execute($request->toDomain());

        return EditMemberResponse::success($editedMember);
    }

    public function editIcon(EditMemberIconRequest $request): JsonResponse
    {
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

            $thumbnailUrl = S3ImageHelper::putImageWithThumbnail($request->file('icon'), S3Path::MEMBER_THUMBNAIL->toString());

            if ($member->activeMember) {
                ActiveMember::create([
                    'member_id'   => $member->activeMember->member_id,
                    'name'        => $member->activeMember->name,
                    'job_title'   => $member->activeMember->job_title,
                    'discord'     => $member->activeMember->discord,
                    'twitter'     => $member->activeMember->twitter,
                    'github'      => $member->activeMember->github,
                    'description' => $member->activeMember->description,
                    'thumbnail'   => $thumbnailUrl,
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
                    'thumbnail'   => $thumbnailUrl,
                    'username'    => $member->nonActiveMember->username,
                    'password'    => $member->nonActiveMember->password,
                    'creator'     => auth()->id()
                ]);
                return response()->json(['message' => 'メンバーの削除に成功しました。']);
            }

            return response()->json(['message' => '予期しないエラーです。'], 500);
        });
    }

    public function delete(DeleteMemberRequest $request): JsonResponse
    {
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

    public function members(): JsonResponse
    {
        $this->authorize('members', Member::class);

        $members = Member::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->orderBy('member_id', 'ASC')
            ->get();

        return MembersResource::collection($members)->response();
    }

    public function member(MemberRequest $request): array
    {
        $this->authorize('member', Member::class);

        $validatedRequest = $request->validated();
        $member           = Member::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->findOrFail($validatedRequest['memberId']);

        return MembersResource::make($member)->toArray($request);
    }

    public function me(Request $request): array
    {
        $member = Member::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->findOrFail(auth()->id());

        return MembersResource::make($member)->toArray($request);
    }
}
