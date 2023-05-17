<?php

namespace Tests\Member\Unit\Service\Command\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;
use MakeIT\Member\Service\Command\Admin\DeleteMemberService;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Domain\Entity\Admin\RoleName;
use Mockery;
use Mockery\MockInterface;
use Tests\AlreadyLoggedInTestCase;

class EditMemberIconServiceTest extends AlreadyLoggedInTestCase
{
    public function test自分のアイコンの変更を行うこと(): void
    {
    }
}
