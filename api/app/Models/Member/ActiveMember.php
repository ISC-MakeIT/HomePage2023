<?php

namespace App\Models\Member;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActiveMember extends Model {
    use HasFactory;

    protected $primaryKey = 'member_id';
    protected $fillable   = [
        'member_id',
        'name',
        'job_title',
        'discord',
        'twitter',
        'github',
        'description',
        'username',
        'password',
        'creator',
        'updator'
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

    public static function isExistsUserNameBy(string $username): bool {
        return ActiveMember::where('username', $username)->exists();
    }
}
