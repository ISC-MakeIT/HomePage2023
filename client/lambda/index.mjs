import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const bots = ['Twitterbot', 'facebookexternalhit'];
const FB_APP_ID = 'EZ9OONPN7OR4J';
const DDB_TABLE_NAME = '';
const URL_PREFIX = 'https://d1iftsw0yrgksz.cloudfront.net';

const dynamoDbClient = new DynamoDBClient({
  apiVersion: '2012-08-10',
  region: 'ap-northeast-1',
});

export const handler = async (event, _, callback) => {
  console.log('start event', event);

  const request = event.Records[0].cf.request;
  const uri = request.uri;
  const userAgent = request.headers['user-agent'][0].value;
  console.log('userAgent', userAgent);

  const isBot = bots.some((bot) => {
    return userAgent.includes(bot);
  });

  if (isBot) {
    const url = new URL(`${URL_PREFIX}${uri}?${request.querystring}`);
    const meta = await getMetaFrom(url.pathname);
    const response = {
      status: '200',
      statusDescription: 'OK',
      headers: {
        'content-type': [
          {
            key: 'Content-Type',
            value: 'text/html',
          },
        ],
      },
      body: getContent(url.toString(), meta),
    };
    callback(null, response);
    return;
  }

  callback(null, request);
};

const getContent = (url, meta) => {
  return `
    <!doctype html>
    <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="Fixel Inc." name="author" />
      <title>${meta.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content=${meta.keywords} />

      <meta content="${FB_APP_ID}" property="fb:app_id" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@isc_makeit" />
      <meta name="twitter:creator" content="@isc_makeit" />
      <meta name="twitter:domain" content="${url}" />
      <meta name="twitter:title" content="${meta.title}" />
      <meta name="twitter:description" content="${meta.description}" />
      <meta name="og:title" content="${meta.title}" />
      <meta property="og:type" content="website" />
      <meta name="og:site_name" content="${meta.title}" />
      <meta name="og:url" content="https://makeit.isc.ac.jp/" />
      <meta name="og:image" content="${meta.thumbnail}" />
      <meta name="og:description" content="${meta.description}" />
      <meta name="theme-color" content="#f8f8f8" />

      <meta name="robots" content="index, follow" />
    </head>
    <body>
    </body>
    </html>
    `;
};

const getMetaFrom = async (pathname) => {
  try {
    const result = await dynamoDbClient
      .send(
        new GetItemCommand({
          TableName: DDB_TABLE_NAME,
          Key: { url: pathname },
        }),
      )
      .promise();
    return result.Item;
  } catch (e) {
    console.error('getInfo error', e);
    throw e;
  }
};
