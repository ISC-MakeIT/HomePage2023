<?php

namespace MakeIT\Member\Domain\Eloquent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class NonActiveMember extends Model
{
    use HasApiTokens;
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
        'thumbnail',
        'username',
        'password',
        'creator',
    ];

    public function getAuthIdentifier()
    {
        return $this->member_id;
    }

    public function getMemberId(): int
    {
        return $this->member_id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getJobTitle(): string
    {
        return $this->job_title;
    }

    public function getDiscord(): string
    {
        return $this->discord;
    }

    public function getTwitter(): string
    {
        return $this->twitter;
    }

    public function getGithub(): string
    {
        return $this->github;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getThumbnail(): string
    {
        return $this->thumbnail;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getHashedPassword(): string
    {
        return $this->password;
    }

    public function getCreator(): int
    {
        return $this->creator;
    }

    public static function isExistsUserNameBy(string $username): bool
    {
        return NonActiveMember::where('username', $username)->exists();
    }
}
