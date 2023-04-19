import { Helmet } from 'react-helmet-async';

interface HeadProps {
  title: string;
  description: string;
  keywords: string;
  thumbnail: string;
}

export const Head = ({ title, description, keywords, thumbnail }: HeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@isc_makeit" />
      <meta name="twitter:creator" content="@isc_makeit" />
      <meta name="twitter:domain" content="https://makeit.isc.ac.jp/" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta name="og:site_name" content={title} />
      <meta name="og:url" content="https://makeit.isc.ac.jp/" />
      <meta name="og:image" content={thumbnail} />
      <meta name="og:description" content={description} />
      <meta name="theme-color" content="#f8f8f8" />

      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};
