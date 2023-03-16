<?php

namespace App\Models\Work;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActiveWork extends Model {
    use HasFactory;

    protected $primaryKey = 'work_id';
    protected $fillable   = [
        'work_id',
        'title',
        'contents',
        'picture',
        'creator',
    ];
}
