<?php

namespace App\Http\Controllers\Work;

use App\Http\Controllers\Controller;
use App\Http\Resources\Work\User\WorksResource;
use App\Models\Work\ActiveWork;
use Illuminate\Http\JsonResponse;

class WorkController extends Controller {
    public function works(): JsonResponse {
        $activeWorks = ActiveWork::all();

        return WorksResource::collection($activeWorks)->response();
    }
}
