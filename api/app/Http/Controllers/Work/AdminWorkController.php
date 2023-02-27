<?php

namespace App\Http\Controllers\Work;

use App\Exceptions\Work\AlreadyEditedWorkException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Work\Admin\EditWorkRequest;
use App\Http\Requests\Work\Admin\RegisterWorkRequest;
use App\Models\Work\ActiveWork;
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

        return response()->json(['message' => '活動実績の作成に成功しました。'], 201);
    }

    public function edit(EditWorkRequest $request): JsonResponse {
        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $foundWork = Work::findOrFail($validatedRequest['workId']);
            if ($foundWork->hasDifferentVersion($validatedRequest['currentVersion'])) {
                throw new AlreadyEditedWorkException();
            }

            $foundWork->activeWork()->delete();
            $foundWork->nonActiveWork()->delete();

            $foundWork->update([
                'version' => $foundWork->version + 1,
                'updator' => auth()->id()
            ]);
            if ($validatedRequest['isActive']) {
                ActiveWork::create([
                    'work_id'  => $validatedRequest['workId'],
                    'title'    => $validatedRequest['title'],
                    'contents' => $validatedRequest['contents'],
                    'creator'  => auth()->id(),
                ]);
                return response()->json(['message' => '活動実績の編集に成功しました。']);
            }

            NonActiveWork::create([
                'work_id'  => $validatedRequest['workId'],
                'title'    => $validatedRequest['title'],
                'contents' => $validatedRequest['contents'],
                'creator'  => auth()->id(),
            ]);
            return response()->json(['message' => '活動実績の編集に成功しました。']);
        });
    }
}
