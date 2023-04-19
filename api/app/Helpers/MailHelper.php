<?php

namespace App\Helpers;

use App\Exceptions\Helpers\FailSendMailException;
use Aws\Exception\AwsException;
use Aws\Ses\SesClient;

class MailHelper {
    private SesClient $sesClient;

    public function __construct(SesClient $sesClient) {
        $this->sesClient = $sesClient;
    }

    public function sendMail(array $recipientEmails, string $subject, string $plaintextBody, string $htmlBody): void {
        $senderEmail = 'makeit@gn.iwasaki.ac.jp';
        $charSet     = 'UTF-8';

        try {
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
        } catch (AwsException $e) {
            throw new FailSendMailException();
        }
    }
}
