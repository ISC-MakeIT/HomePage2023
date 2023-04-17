<?php

namespace App\Http\Controllers\Contact;

use App\Helpers\DiscordHelper;
use App\Helpers\MailHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\User\ContactRequest;
use App\Models\Contact\ContactStartedHistory;
use Aws\Exception\AwsException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller {
    private MailHelper $mailHelper;
    private DiscordHelper $discordHelper;

    public function __construct(MailHelper $mailHelper, DiscordHelper $discordHelper) {
        $this->mailHelper    = $mailHelper;
        $this->discordHelper = $discordHelper;
    }

    public function contact(ContactRequest $request): JsonResponse {
        $validatedRequest = $request->validated();

        DB::transaction(function () use ($validatedRequest) {
            ContactStartedHistory::create($validatedRequest);

            $recipientEmails = ['makeit@gn.iwasaki.ac.jp'];

            $subject       = 'お問い合わせが届きました。';
            $plaintextBody = 'このメールは確認必須です。' ;

            $email     = $validatedRequest['email'];
            $name      = $validatedRequest['name'];
            $category  = $validatedRequest['category'];

            $htmlBody = <<< "EOM"
                <h1>お問い合わせが届きました</h1>
                <p>メールアドレス : $email</p>
                <p>名前           : $name</p>
                <p>カテゴリ       : $category</p>
            EOM;

            try {
                $this->mailHelper->sendMail($recipientEmails, $subject, $plaintextBody, $htmlBody);
            } catch (AwsException $e) {
                return response()->json(['message' => 'お問い合わせに失敗しました。時間を置いてからもう一度お試しください。']);
            }

            $recipientEmails = [$validatedRequest['email']];

            $subject       = '【MakeIT】お問い合わせありがとうございます';
            $plaintextBody = '【MakeIT】お問い合わせありがとうございます';

            $htmlBody = <<< "EOM"
            ※このメールはシステムからの自動返信です

            お名前(ニックネーム可): {$name}
            MekeIT にご興味をお持ちいただきありがとうございます。
            以下の内容でお問い合わせを承りました。

            お問い合わせカテゴリ: {$category}

            担当者が内容を確認し、返信させていただきます。
            今しばらくお待ちください。

            何かご不明な点がございましたら、お気軽にお問い合わせください。

            MekeIT
            EOM;

            $errorMessage = '';

            try {
                $this->mailHelper->sendMail($recipientEmails, $subject, $plaintextBody, $htmlBody);
            } catch (AwsException $e) {
                $errorMessage = "お問い合わせ確認メールを送信できませんでした。\n※お問い合わせメールは、MakeITメールアドレス宛に届いています。";
                logs()->error($errorMessage);
            }

            $message = <<< "EOM"
            ```
            メールアドレス　: $email
            名前　　　　　　: $name
            カテゴリ　　　　: $category
            ```
            EOM;

            if ($errorMessage) {
                $message .= "\n**エラーが発生しました**\n" . $errorMessage;
            }

            $this->discordHelper->sendMessage(
                'お問い合わせが届きました',
                $message
            );
        });

        return response()->json(['message' => 'お問い合わせありがとうございます。']);
    }
}
