<?php

namespace App\Exceptions;

use App\Exceptions\Common\DataIntegrityViolationException;
use App\Exceptions\Helpers\FailSendMailException;
use App\Exceptions\Notification\AlreadyEditedNotificationException;
use App\Exceptions\Work\AlreadyEditedWorkException;
use App\Http\Response\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use MakeIT\Member\Exception\AlreadyCreatedUserNameOfMemberException;
use MakeIT\Member\Exception\AlreadyEditedMemberException;
use MakeIT\Member\Exception\IllegalChangeMyRole;
use MakeIT\Member\Exception\IllegalPasswordDifferentException;
use Throwable;

class Handler extends ExceptionHandler
{
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

    public function render($request, Throwable $e)
    {
        if (!$request->isMethod('GET')) {
            logs()->error('REQUEST:', count($request->toArray()) === 0 ? ['Empty request'] : $request->toArray());
            logs()->error('URL:', [$request->fullUrl()]);
            logs()->error($e);
        }

        if ($e instanceof DataIntegrityViolationException) {
            return Response::error($e->getMessage(), null, 500);
        }
        if ($e instanceof ModelNotFoundException) {
            return Response::error($e->getMessage(), null, 400);
        }
        if ($e instanceof AlreadyCreatedUserNameOfMemberException) {
            return Response::error('既に使用されているユーザー名です。', null, 400);
        }
        if ($e instanceof AlreadyEditedMemberException) {
            return Response::error('既に編集されているメンバーです。', null, 400);
        }
        if ($e instanceof IllegalPasswordDifferentException) {
            return Response::error('古いパスワードが違います。', null, 400);
        }
        if ($e instanceof IllegalChangeMyRole) {
            return Response::error('自分自身のロール変更は不可能です。', null, 400);
        }
        if ($e instanceof AlreadyEditedNotificationException) {
            return Response::error('既に編集されているお知らせです。', null, 500);
        }
        if ($e instanceof AlreadyEditedWorkException) {
            return Response::error('既に編集されている活動実績です。', null, 500);
        }
        if ($e instanceof FailSendMailException) {
            return Response::error('メールの送信に失敗しました。', null, 500);
        }

        if ($e instanceof ValidationException) {
            return response(['errors' => $e->errors()], 400);
        }

        return parent::render($request, $e);
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
