<?php

namespace App\Http\Controllers\Work;

use App\Exceptions\Work\AlreadyEditedWorkException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Work\Admin\DeleteWorkRequest;
use App\Http\Requests\Work\Admin\EditWorkRequest;
use App\Http\Requests\Work\Admin\RegisterWorkRequest;
use App\Http\Requests\Work\Admin\WorkRequest;
use App\Http\Resources\Work\Admin\WorksResource;
use App\Models\Work\ActiveWork;
use App\Models\Work\ArchiveWork;
use App\Models\Work\NonActiveWork;
use App\Models\Work\Work;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AdminWorkController extends Controller {
    public function register(RegisterWorkRequest $request): JsonResponse {
        $this->authorize('register', Work::class);

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
        $this->authorize('edit', Work::class);

        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $foundWork = Work::doesntHave('archiveWork')->findOrFail($validatedRequest['workId']);
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

    public function delete(DeleteWorkRequest $request): JsonResponse {
        $this->authorize('delete', Work::class);

        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $foundWork = Work::doesntHave('archiveWork')
                ->with(['activeWork', 'nonActiveWork'])
                ->findOrFail($validatedRequest['workId']);
            $foundWork->update(['updator' => auth()->id()]);

            if ($foundWork->activeWork) {
                ArchiveWork::create([
                    'work_id'  => $foundWork->activeWork->work_id,
                    'title'    => $foundWork->activeWork->title,
                    'contents' => $foundWork->activeWork->contents,
                    'creator'  => auth()->id(),
                ]);
                $foundWork->activeWork()->delete();
                return response()->json(['message' => '活動実績の削除に成功しました。']);
            }
            if ($foundWork->nonActiveWork) {
                ArchiveWork::create([
                    'work_id'  => $foundWork->nonActiveWork->work_id,
                    'title'    => $foundWork->nonActiveWork->title,
                    'contents' => $foundWork->nonActiveWork->contents,
                    'creator'  => auth()->id(),
                ]);
                $foundWork->nonActiveWork()->delete();
                return response()->json(['message' => '活動実績の削除に成功しました。']);
            }
            return response()->json(['message' => '予期しないエラーが発生しました。'], 500);
        });
    }

    public function works(): JsonResponse {
        $this->authorize('works', Work::class);

        $works = Work::doesntHave('archiveWork')
            ->with(['activeWork', 'nonActiveWork'])
            ->get();

        return WorksResource::collection($works)->response();
    }

    public function work(WorkRequest $request): array {
        $this->authorize('work', Work::class);

        $work = Work::doesntHave('archiveWork')
            ->with(['activeWork', 'nonActiveWork'])
            ->findOrFail($request->workId);

        return WorksResource::make($work)->toArray($request);
    }
}
