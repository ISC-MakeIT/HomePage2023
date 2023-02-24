<?php

namespace App\Http\Controllers\Work;

use App\Http\Controllers\Controller;
use App\Http\Requests\Work\Admin\RegisterWorkRequest;
use App\Models\Work\NonActiveWork;
use App\Models\Work\Work;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AdminWorkController extends Controller {
    public function register(RegisterWorkRequest $request): JsonResponse {
        DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $work = Work::create([
                'creator' => auth()->id(),
                'updator' => auth()->id(),
            ]);
            $nonActiveWorkContent = array_merge(
                [
                    'work_id'  => $work->work_id,
                    'creator'  => auth()->id(),
                ],
                $validatedRequest
            );
            NonActiveWork::create($nonActiveWorkContent);
        });

        return response()->json(['message' => '活動の作成に成功しました。'], 201);
    }
}
