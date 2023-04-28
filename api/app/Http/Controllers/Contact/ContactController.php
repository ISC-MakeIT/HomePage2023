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
            $plaintextBody = 'このメールは必ず確認してください。' ;

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
            <p>※このメールはシステムからの自動返信です<br/></p>

            <p>
            MekeIT にご興味をお持ちいただきありがとうございます。<br/>
            以下の内容でお問い合わせを承りました。<br/>
            </p>

            <p>
            ===============================================================<br/>
            お名前(ニックネーム可): {$name}<br/>
            お問い合わせカテゴリ: {$category}<br/>
            メールアドレス: {$email}<br/>
            ===============================================================<br/>
            </p>

            <p>
            担当者が内容を確認し、返信させていただきます。<br/>
            今しばらくお待ちください。<br/>
            </p>

            <p>何かご不明な点がございましたら、お気軽にお問い合わせください。<br/></p>

            <p>MekeIT</p>
            EOM;

            if ($category === "体験入部") {
                $htmlBody = <<< "EOM"
                <p>※このメールはシステムからの自動返信です<br/></p>

                <p>
                {$name}さんこんにちは！<br/><br/>
                体験入部にご興味を持っていただき、ありがとうございます。<Br/>

                まずはじめに、体験入部の準備としてDiscordというアプリのセットアップをお願いいたします。<br/>
                Discordは、複数人でのコミュニケーションを取りやすくするためのアプリです。<br/>
                もし、まだインストールされていない場合は、PCやスマートフォンにダウンロードしてセットアップしてくださいね。<br/>
                (PCでの利用をお勧めします！)<br/><br/>

                Discordの始め方<br/><br/>

                https://support.discord.com/hc/ja/articles/360033931551-%E3%81%AE%E5%A7%8B%E3%82%81%E6%96%B9 <br/><br/>

                次に、以下の招待リンクをクリックして、私たちのDiscordサーバーに参加してください！<br/><br/>

                https://discord.gg/mPpSVCZNTs<br/><br/>

                サーバーに参加したら、まずは簡単な自己紹介をお願いします！私たちもあなたに会えるのを楽しみにしています。<br/><br/>

                もし何か質問があれば、お気軽にお問い合わせくださいね。それでは、体験入部でお会いできるのを楽しみにしています！<br/><br/>

                よろしくお願いします！<br/><br/>

                MakeIT
                </p>
                EOM;
            }

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
