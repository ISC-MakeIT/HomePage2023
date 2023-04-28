import { type SerializedStyles, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { DisabledRedToOrangeGradientButton } from 'src/components/atoms/Button/DisabledRedToOrangeGradientButton';
import { GreenToBlueGradientButton } from 'src/components/atoms/Button/GreenToBlueGradientButton';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';
import { RedToOrangeGradientButton } from 'src/components/atoms/Button/RedToOrangeGradientButton';

type GRADIENT_TYPE = 'greenToBlue' | 'redToOrange';

interface GradientButtonWithIconAndArrowProps {
  to?: string;
  gradientType: GRADIENT_TYPE;
  icon: JSX.Element;
  buttonType?: 'submit' | 'button' | 'reset';
  children?: React.ReactNode;
  disabled?: boolean;
}

export const GradientButtonWithIconAndArrow = ({
  to,
  icon,
  gradientType,
  buttonType,
  children,
  disabled,
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
      if (disabled) {
        return (
          <DisabledRedToOrangeGradientButton type={type}>
            <div css={style}>{children}</div>
          </DisabledRedToOrangeGradientButton>
        );
      }
      return (
        <GreenToBlueGradientButton type={type}>
          <div css={style}>{children}</div>
        </GreenToBlueGradientButton>
      );
    }
    if (gradientType === 'redToOrange') {
      if (disabled) {
        return (
          <DisabledRedToOrangeGradientButton type={type}>
            <div css={style}>{children}</div>
          </DisabledRedToOrangeGradientButton>
        );
      }
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
        filter: gray;
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
