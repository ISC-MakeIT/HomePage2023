<?php

namespace App\Exceptions;

use App\Exceptions\Member\AlreadyCreatedUserNameOfMemberException;
use App\Exceptions\Notification\AlreadyEditedNotificationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler {
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function render($request, Throwable $e) {
        if ($e instanceof AlreadyCreatedUserNameOfMemberException) {
            return response(['message' => '既に使用されているユーザー名です'], 400);
        }
        if ($e instanceof AlreadyEditedNotificationException) {
            return response(['message' => '既に編集されているお知らせです。'], 500);
        }
        if ($e instanceof ValidationException) {
            return response($e->errors(), 400);
        }

        return parent::render($request, $e);
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
