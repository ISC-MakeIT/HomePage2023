import { SerializedStyles, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { GreenToBlueGradientButton } from 'src/components/atoms/Button/GreenToBlueGradientButton';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';
import { RedToOrangeGradientButton } from 'src/components/atoms/Button/RedToOrangeGradientButton';

type GRADIENT_TYPE = 'greenToBlue' | 'redToOrange';

type GradientButtonWithIconAndArrowProps = {
  to?: string;
  gradientType: GRADIENT_TYPE;
  icon: JSX.Element;
  buttonType?: 'submit' | 'button' | 'reset';
  children?: React.ReactNode;
};

export const GradientButtonWithIconAndArrow = ({
  to,
  icon,
  gradientType,
  buttonType,
  children,
}: GradientButtonWithIconAndArrowProps) => {
  const GradientButton = ({
    children,
    style,
    type,
  }: {
    children: React.ReactNode;
    style: SerializedStyles;
    type?: 'submit' | 'button' | 'reset';
  }) => {
    if (gradientType === 'greenToBlue') {
      return (
        <GreenToBlueGradientButton type={type}>
          <div css={style}>{children}</div>
        </GreenToBlueGradientButton>
      );
    }
    if (gradientType === 'redToOrange') {
      return (
        <RedToOrangeGradientButton type={type}>
          <div css={style}>{children}</div>
        </RedToOrangeGradientButton>
      );
    }
    return <></>;
  };

  if (to) {
    return (
      <Link
        to={to}
        css={css`
          text-decoration: none;
        `}
      >
        <GradientButton
          type={buttonType}
          style={css`
            display: flex;
            align-items: center;
            column-gap: 0.5rem;
          `}
        >
          {icon}
          {children}
          <Arrow />
        </GradientButton>
      </Link>
    );
  }

  return (
    <GradientButton
      type={buttonType}
      style={css`
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
      `}
    >
      {icon}
      {children}
      <Arrow />
    </GradientButton>
  );
};
