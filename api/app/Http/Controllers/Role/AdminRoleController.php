<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Response\Member\Admin\RolesResponse;
use Illuminate\Http\JsonResponse;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Role\Service\Query\Admin\RolesService;

class AdminRoleController extends Controller
{
    private RolesService $rolesService;

    public function __construct(RolesService $rolesService)
    {
        $this->rolesService = $rolesService;
    }

    public function roles(): JsonResponse
    {
        $this->authorize('roles', RoleORM::class);

        $roles = $this->rolesService->execute();

        return RolesResponse::success($roles);
    }
}
