<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BaseTestCase extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
    }
}
