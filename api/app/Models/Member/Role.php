<?php

namespace App\Models\Member;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model {
    use HasFactory;

    public const UPDATED_AT = null;

    protected $primaryKey = 'role_id';
    protected $fillable   = [
        'name',
    ];

    public function toLowerCamelCaseJson(): array {
        return [
            'roleId' => $this->role_id,
            'name'   => $this->name,
        ];
    }
}
