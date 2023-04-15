<?php

namespace App\Helpers;

use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;

class DiscordHelper {
    private Client $client;

    public function __construct(Client $client) {
        $this->client = $client;
    }

    public function sendMessage(string $username, string $content): ResponseInterface {
        return $this->client->post(
            config('logging.discordWebhookUrl'),
            [
                'json' => [
                    'username' => $username,
                    'content'  => $content,
                ],
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
            ],
        );
    }
}
