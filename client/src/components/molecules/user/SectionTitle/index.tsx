import { GreyMediumText } from 'src/components/atoms/Text/GreyMediumText';
import { BlueMediumTitle } from 'src/components/atoms/Title/BlueMediumTitle';

interface SectionTitleProps {
  title: string;
  description: string;
}

export const SectionTitle = ({ title, description }: SectionTitleProps) => {
  return (
    <div>
      <BlueMediumTitle>{title}</BlueMediumTitle>
      <GreyMediumText>{description}</GreyMediumText>
    </div>
  );
};
