<?php

namespace App\Models\Work;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model {
    use HasFactory;

    public const UPDATED_AT = null;

    protected $primaryKey = 'work_id';
    protected $fillable   = [
        'version',
        'creator',
        'updator',
    ];
}
