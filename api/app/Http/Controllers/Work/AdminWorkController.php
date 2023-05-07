<?php

namespace App\Http\Controllers\Work;

use App\Domain\ValueObjects\Helpers\S3Path;
use App\Exceptions\Work\AlreadyEditedWorkException;
use App\Helpers\S3ImageHelper;
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

class AdminWorkController extends Controller
{
    public function register(RegisterWorkRequest $request): JsonResponse
    {
        $this->authorize('register', Work::class);

        DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $thumbnail = [];
            if ($request->has('picture')) {
                $thumbnailUrl = S3ImageHelper::putImageWithThumbnail(
                    $request->file('picture'),
                    S3Path::WORK_THUMBNAIL->toString()
                );
                $thumbnail = ['thumbnail' => $thumbnailUrl];
            }

            $work = Work::create([
                'creator'   => auth()->id(),
                'updator'   => auth()->id(),
            ]);
            $nonActiveWorkContent = array_merge(
                [
                    'work_id'  => $work->work_id,
                    'creator'  => auth()->id(),
                ],
                $validatedRequest,
                $thumbnail
            );
            NonActiveWork::create($nonActiveWorkContent);
        });

        return response()->json(['message' => '活動実績の作成に成功しました。'], 201);
    }

    public function edit(EditWorkRequest $request): JsonResponse
    {
        $this->authorize('edit', Work::class);

        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $foundWork = Work::with(['activeWork', 'nonActiveWork'])
                ->doesntHave('archiveWork')
                ->findOrFail($validatedRequest['workId']);

            if ($foundWork->hasDifferentVersion($validatedRequest['currentVersion'])) {
                throw new AlreadyEditedWorkException();
            }

            $foundWork->activeWork()->delete();
            $foundWork->nonActiveWork()->delete();

            $foundWork->update([
                'version' => $foundWork->version + 1,
                'updator' => auth()->id()
            ]);

            $thumbnail = [];

            if ($foundWork->activeWork) {
                $thumbnail = ['thumbnail' => $foundWork->activeWork->thumbnail];
            }
            if ($foundWork->nonActiveWork) {
                $thumbnail = ['thumbnail' => $foundWork->nonActiveWork->thumbnail];
            }

            if ($request->has('picture')) {
                $thumbnailUrl = S3ImageHelper::putImageWithThumbnail(
                    $request->file('picture'),
                    S3Path::WORK_THUMBNAIL->toString()
                );
                $thumbnail = ['thumbnail' => $thumbnailUrl];
            }

            if ($validatedRequest['isActive']) {
                ActiveWork::create(array_merge(
                    [
                        'work_id'  => $validatedRequest['workId'],
                        'title'    => $validatedRequest['title'],
                        'contents' => $validatedRequest['contents'],
                        'creator'  => auth()->id(),
                    ],
                    $thumbnail
                ));
                return response()->json(['message' => '活動実績の編集に成功しました。']);
            }

            NonActiveWork::create(array_merge(
                [
                    'work_id'  => $validatedRequest['workId'],
                    'title'    => $validatedRequest['title'],
                    'contents' => $validatedRequest['contents'],
                    'creator'  => auth()->id(),
                ],
                $thumbnail
            ));
            return response()->json(['message' => '活動実績の編集に成功しました。']);
        });
    }

    public function delete(DeleteWorkRequest $request): JsonResponse
    {
        $this->authorize('delete', Work::class);

        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $foundWork = Work::doesntHave('archiveWork')
                ->with(['activeWork', 'nonActiveWork'])
                ->findOrFail($validatedRequest['workId']);
            $foundWork->update(['updator' => auth()->id()]);

            if ($foundWork->activeWork) {
                ArchiveWork::create([
                    'work_id'   => $foundWork->activeWork->work_id,
                    'title'     => $foundWork->activeWork->title,
                    'contents'  => $foundWork->activeWork->contents,
                    'thumbnail' => $foundWork->activeWork->thumbnail,
                    'creator'   => auth()->id(),
                ]);
                $foundWork->activeWork()->delete();
                return response()->json(['message' => '活動実績の削除に成功しました。']);
            }
            if ($foundWork->nonActiveWork) {
                ArchiveWork::create([
                    'work_id'   => $foundWork->nonActiveWork->work_id,
                    'title'     => $foundWork->nonActiveWork->title,
                    'contents'  => $foundWork->nonActiveWork->contents,
                    'thumbnail' => $foundWork->nonActiveWork->thumbnail,
                    'creator'   => auth()->id(),
                ]);
                $foundWork->nonActiveWork()->delete();
                return response()->json(['message' => '活動実績の削除に成功しました。']);
            }
            return response()->json(['message' => '予期しないエラーが発生しました。'], 500);
        });
    }

    public function works(): JsonResponse
    {
        $this->authorize('works', Work::class);

        $works = Work::doesntHave('archiveWork')
            ->with(['activeWork', 'nonActiveWork'])
            ->orderBy('work_id', 'ASC')
            ->get();

        return WorksResource::collection($works)->response();
    }

    public function work(WorkRequest $request): array
    {
        $this->authorize('work', Work::class);

        $work = Work::doesntHave('archiveWork')
            ->with(['activeWork', 'nonActiveWork'])
            ->findOrFail($request->workId);

        return WorksResource::make($work)->toArray($request);
    }
}
