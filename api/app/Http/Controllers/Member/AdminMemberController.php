<?php

namespace App\Http\Controllers\Member;

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
use App\Http\Response\Member\Admin\ChangeActivityResponse;
use App\Http\Response\Member\Admin\ChangePasswordResponse;
use App\Http\Response\Member\Admin\ChangeRoleResponse;
use App\Http\Response\Member\Admin\DeleteMemberResponse;
use App\Http\Response\Member\Admin\EditMemberIconResponse;
use App\Http\Response\Member\Admin\EditMemberResponse;
use App\Http\Response\Member\Admin\FindAllMemberResponse;
use App\Http\Response\Member\Admin\FindMeResponse;
use App\Http\Response\Member\Admin\FindOneMemberResponse;
use App\Http\Response\Member\Admin\LoginResponse;
use App\Http\Response\Member\Admin\LogoutResponse;
use App\Http\Response\Member\Admin\RegisterMemberResponse;
use App\Http\Response\Member\Admin\RolesResponse;
use App\Models\Member\Member;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use MakeIT\Member\Service\Command\ChangeMemberActivityService;
use MakeIT\Member\Service\Command\ChangeMemberPasswordService;
use MakeIT\Member\Service\Command\ChangeMemberRoleService;
use MakeIT\Member\Service\Command\DeleteMemberService;
use MakeIT\Member\Service\Command\EditMemberIconService;
use MakeIT\Member\Service\Command\EditMemberService;
use MakeIT\Member\Service\Command\LoginService;
use MakeIT\Member\Service\Command\LogoutService;
use MakeIT\Member\Service\Command\RegisterMemberService;
use MakeIT\Member\Service\Query\FindAllMemberService;
use MakeIT\Member\Service\Query\FindMeService;
use MakeIT\Member\Service\Query\FindOneMemberService;
use MakeIT\Role\Service\Query\RolesService;

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
    private EditMemberIconService $editMemberIconService;
    private DeleteMemberService $deleteMemberService;
    private FindAllMemberService $findAllMemberService;
    private FindOneMemberService $findOneMemberService;
    private FindMeService $findMeService;

    public function __construct(
        LoginService $loginService,
        LogoutService $logoutService,
        RolesService $rolesService,
        ChangeMemberRoleService $changeMemberRoleService,
        ChangeMemberActivityService $changeMemberActivityService,
        ChangeMemberPasswordService $changeMemberPasswordService,
        RegisterMemberService $registerMemberService,
        EditMemberService $editMemberService,
        EditMemberIconService $editMemberIconService,
        DeleteMemberService $deleteMemberService,
        FindAllMemberService $findAllMemberService,
        FindOneMemberService $findOneMemberService,
        FindMeService $findMeService
    ) {
        $this->loginService                = $loginService;
        $this->logoutService               = $logoutService;
        $this->rolesService                = $rolesService;
        $this->changeMemberRoleService     = $changeMemberRoleService;
        $this->changeMemberActivityService = $changeMemberActivityService;
        $this->changeMemberPasswordService = $changeMemberPasswordService;
        $this->registerMemberService       = $registerMemberService;
        $this->editMemberService           = $editMemberService;
        $this->editMemberIconService       = $editMemberIconService;
        $this->deleteMemberService         = $deleteMemberService;
        $this->findAllMemberService        = $findAllMemberService;
        $this->findOneMemberService        = $findOneMemberService;
        $this->findMeService               = $findMeService;
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

        $editedMember = $this->editMemberIconService->execute($request->toDomain());

        return EditMemberIconResponse::success($editedMember);
    }

    public function delete(DeleteMemberRequest $request): JsonResponse
    {
        $this->authorize('delete', Member::class);

        $validatedRequest = $request->validated();

        $this->deleteMemberService->execute($validatedRequest['memberId']);

        return DeleteMemberResponse::success();
    }

    public function members(): JsonResponse
    {
        $this->authorize('members', Member::class);

        $members = $this->findAllMemberService->execute();

        return FindAllMemberResponse::success($members);
    }

    public function member(MemberRequest $request): JsonResponse
    {
        $this->authorize('member', Member::class);

        $validatedRequest = $request->validated();

        $member = $this->findOneMemberService->execute($validatedRequest['memberId']);

        return FindOneMemberResponse::success($member);
    }

    public function me(): JsonResponse
    {
        $member = $this->findMeService->execute();

        return FindMeResponse::success($member);
    }
}
