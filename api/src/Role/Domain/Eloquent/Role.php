<?php

namespace MakeIT\Role\Domain\Eloquent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public const UPDATED_AT = null;

    protected $primaryKey = 'role_id';
    protected $fillable   = [
        'name',
    ];

    public function getRoleId(): int
    {
        return $this->role_id;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
