<?php

namespace App\Models\Member;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActiveMember extends Model {
    use HasFactory;

    public const UPDATED_AT = null;

    protected $primaryKey = 'member_id';
    protected $fillable = [
        'member_id',
        'name',
        'job_title',
        'discord',
        'twitter',
        'github',
        'description',
        'username',
        'password'
    ];
    protected $hidden = [
        'password',
    ];

    public function toLowerCamelCaseJson(): array {
        return [
            'memberId'    => $this->member_id,
            'name'        => $this->name,
            'jobTitle'    => $this->job_title,
            'discord'     => $this->discord,
            'twitter'     => $this->twitter,
            'github'      => $this->github,
            'description' => $this->description,
        ];
    }
}
