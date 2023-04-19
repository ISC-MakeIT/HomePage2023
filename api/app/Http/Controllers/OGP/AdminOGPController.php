<?php

namespace App\Http\Controllers\OGP;

use App\Domain\ValueObjects\Helpers\S3Path;
use App\Helpers\S3ImageHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\OGP\Admin\DeleteOGPRequest;
use App\Http\Requests\OGP\Admin\EditOGPRequest;
use App\Http\Requests\OGP\Admin\OGPRequest;
use App\Http\Requests\OGP\Admin\RegisterOGPRequest;
use App\Http\Resources\OGP\Admin\OGPResources;
use App\Models\OGP\OGP;
use Illuminate\Http\JsonResponse;

class AdminOGPController extends Controller {
    public function OGPList(): JsonResponse {
        $this->authorize('OGPList', OGP::class);

        return OGPResources::collection(OGP::all())->response();
    }

    public function registerOGP(RegisterOGPRequest $request): JsonResponse {
        $this->authorize('registerOGP', OGP::class);

        $validatedRequest = $request->validated();

        $thumbnailUrl = S3ImageHelper::putImage(
            $request->file('thumbnail'),
            S3Path::OGP_THUMBNAIL->toString(),
            1200,
            630,
            20
        );
        OGP::insert(
            $validatedRequest['url'],
            $validatedRequest['description'],
            $validatedRequest['title'],
            $validatedRequest['keywords'],
            $thumbnailUrl,
        );
        return response()->json(['message' => 'OGPの作成に成功しました。']);
    }

    public function editOGP(EditOGPRequest $request): JsonResponse {
        $this->authorize('editOGP', OGP::class);

        $validatedRequest = $request->validated();

        if ($request->has('thumbnail')) {
            $thumbnailUrl = S3ImageHelper::putImage(
                $request->file('thumbnail'),
                S3Path::OGP_THUMBNAIL->toString(),
                1200,
                630,
                20
            );
            OGP::update(
                $validatedRequest['url'],
                $validatedRequest['description'],
                $validatedRequest['title'],
                $validatedRequest['keywords'],
                $thumbnailUrl
            );
            return response()->json(['message' => 'OGPの編集に成功しました。']);
        }

        $preOgp       = OGP::findByUrl($validatedRequest['url']);
        $thumbnailUrl = $preOgp['thumbnail'];
        OGP::update(
            $validatedRequest['url'],
            $validatedRequest['description'],
            $validatedRequest['title'],
            $validatedRequest['keywords'],
            $thumbnailUrl
        );
        return response()->json(['message' => 'OGPの編集に成功しました。']);
    }

    public function deleteOGP(DeleteOGPRequest $request): JsonResponse {
        $this->authorize('deleteOGP', OGP::class);

        $validatedRequest = $request->validated();
        OGP::deleteByUrl($validatedRequest['url']);

        return response()->json(['message' => 'OGPの削除に成功しました。']);
    }

    public function OGP(OGPRequest $request): array {
        $this->authorize('OGP', OGP::class);

        $validatedRequest = $request->validated();

        return OGPResources::make(OGP::findByUrl($validatedRequest['url']))->toArray($request);
    }
}
