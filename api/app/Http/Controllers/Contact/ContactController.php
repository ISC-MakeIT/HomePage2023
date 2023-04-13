<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\User\ContactRequest;
use App\Models\Contact\ContactStartedHistory;
use Aws\Ses\SesClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller {
    private SesClient $sesClient;

    public function __construct(SesClient $sesClient) {
        $this->sesClient = $sesClient;
    }

    public function contact(ContactRequest $request): JsonResponse {
        $validatedRequest = $request->validated();

        DB::transaction(function () use ($validatedRequest) {
            ContactStartedHistory::create($validatedRequest);

            $senderEmail     = 'makeit@gn.iwasaki.ac.jp';
            $recipientEmails = ['makeit@gn.iwasaki.ac.jp'];

            $subject       = '【お問い合わせ】お問い合わせが届きました。';
            $plaintextBody = 'このメールは確認必須です。' ;

            $email     = $validatedRequest['email'];
            $name      = $validatedRequest['name'];
            $category  = $validatedRequest['category'];

            $htmlBody      =  <<< "EOM"
                <h1>お問い合わせが届きました</h1>
                <p>メールアドレス : $email</p>
                <p>名前           : $name</p>
                <p>カテゴリ       : $category</p>
            EOM;
            $charSet = 'UTF-8';

            $this->sesClient->sendEmail([
                'Destination' => [
                    'ToAddresses' => $recipientEmails,
                ],
                'ReplyToAddresses' => [$senderEmail],
                'Source'           => $senderEmail,
                'Message'          => [
                  'Body' => [
                      'Html' => [
                          'Charset' => $charSet,
                          'Data'    => $htmlBody,
                      ],
                      'Text' => [
                          'Charset' => $charSet,
                          'Data'    => $plaintextBody,
                      ],
                  ],
                  'Subject' => [
                      'Charset' => $charSet,
                      'Data'    => $subject,
                  ],
                ],
            ]);
        });

        return response()->json(['message' => 'お問い合わせありがとうございます。']);
    }
}
