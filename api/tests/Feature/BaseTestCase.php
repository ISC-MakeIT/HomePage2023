<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use MakeIT\Member\Repository\Interface\MemberRepository;
use MakeIT\Role\Repository\Interface\RoleRepository;
use Tests\TestCase;

class BaseTestCase extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    protected MemberRepository $memberRepo;
    protected RoleRepository $roleRepo;

    public function __construct(
        string $name,
        MemberRepository $memberRepo,
        RoleRepository $roleRepo,
    ) {
        parent::__construct($name);

        $this->memberRepo = $memberRepo;
        $this->roleRepo   = $roleRepo;
    }

    protected function setUp(): void
    {
        parent::setUp();
    }
}
