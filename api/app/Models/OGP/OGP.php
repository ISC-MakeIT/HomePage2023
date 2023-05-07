<?php

namespace App\Models\OGP;

use Aws\Sdk;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class OGP
{
    public static function dynamodbClient()
    {
        $sdk = new Sdk([
            'endpoint'    => config('database.dynamodb.endpoint'),
            'region'      => config('filesystems.disks.s3.region'),
            'version'     => 'latest',
            'credentials' => [
                'key'    => config('filesystems.disks.s3.key'),
                'secret' => config('filesystems.disks.s3.secret'),
            ]
        ]);
        return $sdk->createDynamoDb();
    }

    public static function all()
    {
        $dynamodbClient = self::dynamoDbClient();

        $response = $dynamodbClient->scan([
            "TableName" => config('database.dynamodb.table_name'),
        ]);
        return array_map(function ($item) {
            return [
                'url'         => $item['url']['S'],
                'description' => $item['description']['S'],
                'title'       => $item['title']['S'],
                'keywords'    => $item['keywords']['S'],
                'thumbnail'   => $item['thumbnail']['S'],
            ];
        }, $response['Items']);
    }

    public static function findByUrl(string $url)
    {
        $dynamodbClient = self::dynamoDbClient();

        $response = $dynamodbClient->getItem([
            "TableName" => config('database.dynamodb.table_name'),
            'Key'       => [
                'url' => ['S' => $url]
            ]
        ]);

        if ($response['Item'] === null) {
            throw new NotFoundHttpException();
        }

        return [
            'url'         => $response['Item']['url']['S'],
            'description' => $response['Item']['description']['S'],
            'title'       => $response['Item']['title']['S'],
            'keywords'    => $response['Item']['keywords']['S'],
            'thumbnail'   => $response['Item']['thumbnail']['S'],
        ];
    }

    public static function update(string $url, string $description, string $title, string $keywords, string $thumbnail)
    {
        $dynamodbClient = self::dynamoDbClient();

        $response = $dynamodbClient->getItem([
            "TableName" => config('database.dynamodb.table_name'),
            'Key'       => [
                'url' => ['S' => $url]
            ]
        ]);

        if ($response['Item'] === null) {
            throw new NotFoundHttpException();
        }

        $dynamodbClient->updateItem([
            "TableName"                => config('database.dynamodb.table_name'),
            'Key'                      => [
                'url' => ['S' => $url]
            ],
            'UpdateExpression'         => "set #description = :description, #title = :title, #keywords = :keywords, #thumbnail = :thumbnail",
            "ExpressionAttributeNames" => [
                "#description" => "description",
                "#title"       => "title",
                "#keywords"    => "keywords",
                "#thumbnail"   => "thumbnail",
            ],
            'ExpressionAttributeValues' => [
                ':description' => ['S' => $description],
                ':title'       => ['S' => $title],
                ':keywords'    => ['S' => $keywords],
                ':thumbnail'   => ['S' => $thumbnail],
            ],
        ]);
    }

    public static function insert(string $url, string $description, string $title, string $keywords, string $thumbnail)
    {
        $dynamodbClient = self::dynamoDbClient();

        $dynamodbClient->putItem([
            "TableName" => config('database.dynamodb.table_name'),
            'Item'      => [
                'url'         => ['S' => $url],
                'description' => ['S' => $description],
                'title'       => ['S' => $title],
                'keywords'    => ['S' => $keywords],
                'thumbnail'   => ['S' => $thumbnail],
            ],
        ]);
    }

    public static function deleteByUrl(string $url)
    {
        $dynamodbClient = self::dynamoDbClient();

        $dynamodbClient->deleteItem([
            "TableName" => config('database.dynamodb.table_name'),
            'Key'       => [
                'url' => ['S' => $url],
            ],
        ]);
    }
}
