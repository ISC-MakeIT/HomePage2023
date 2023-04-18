import { Head } from '../../presentationalComponents/Head';

type HeadContainerProps = {
  title: string;
  description: string;
  keywords: string;
  thumbnail: string;
};

export const HeadContainer = ({ title, description, keywords, thumbnail }: HeadContainerProps) => {
  return <Head title={title} description={description} keywords={keywords} thumbnail={thumbnail} />;
};
