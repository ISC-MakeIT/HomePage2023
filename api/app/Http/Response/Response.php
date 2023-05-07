<?php

namespace App\Http\Response;

use Illuminate\Http\Resources\Json\JsonResource;

class Response
{
    private int $statusCode;
    private string $message;
    private JsonResource $data;

    private function __construct(int $statusCode, string $message, JsonResource $data)
    {
        $this->statusCode = $statusCode;
        $this->message    = $message;
        $this->data       = $data;
    }

    private function toJson()
    {
        return response()->json([
            'message' => $this->message,
            'data'    => $this->data->response()
        ], $this->statusCode);
    }

    public static function success(string $message, ?JsonResource $data = null, int $statusCode = 200)
    {
        if ($data) {
            return (new Response(
                $statusCode,
                $message,
                $data
            ))->toJson();
        }

        return (new Response(
            $statusCode,
            $message,
            JsonResource::make([])
        ))->toJson();
    }

    public static function error(string $message, ?JsonResource $data = null, int $statusCode = 500)
    {
        if ($data) {
            return (new Response(
                $statusCode,
                $message,
                $data
            ))->toJson();
        }

        return (new Response(
            $statusCode,
            $message,
            JsonResource::make([])
        ))->toJson();
    }
}
