import { css } from '@emotion/react';
import { WhiteMakeIT } from 'src/components/atoms/Logo/WhiteMakeIT';
import { GradientButtonWithIconAndArrow } from 'src/components/molecules/user/Button/GradientButtonWithIconAndArrow';
import { Flex } from 'src/components/atoms/Layout/Flex';
import { Man } from 'src/components/atoms/Button/Icon/Man';
import { Woman } from 'src/components/atoms/Button/Icon/Woman';
import { DarkMakeIT } from 'src/components/atoms/Logo/DarkMakeIT';
import { WhiteNavigation } from 'src/components/molecules/user/WhiteNavigation';
import { BlackNavigation } from 'src/components/molecules/user/BlackNavigation';
import { WhiteGithubButton } from 'src/components/molecules/user/Button/WhiteGithubButton';
import { BlackGithubButton } from 'src/components/molecules/user/Button/BlackGithubButton';
import { Link } from 'react-router-dom';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';

type HeaderProps = {
  isStartingLocationInThisPage: boolean;
};

export const Header = ({ isStartingLocationInThisPage }: HeaderProps) => {
  const forStartingLocation = css``;
  const forStartedLocation = css`
    background-color: #fff;
    box-shadow: 0 4px 4px rgba(51, 51, 51, 0.1);
  `;

  const HeaderContentsForStartingLocation = () => {
    return (
      <>
        <Flex
          spacing='1.5rem'
          style={css`
            align-items: center;
          `}
        >
          <Link
            to={USER_ROUTE_PATH_MAP.TOP}
            css={css`
              width: 7.18rem;
              &:hover {
                cursor: pointer;
              }
            `}
          >
            <WhiteMakeIT />
          </Link>
          <WhiteNavigation />
          <WhiteGithubButton />
        </Flex>

        <Flex
          spacing='1rem'
          style={css`
            align-items: center;
          `}
        >
          <GradientButtonWithIconAndArrow
            to={`${USER_ROUTE_PATH_MAP.TOP}#contact`}
            icon={<Man width='1.5rem' height='1.5rem' />}
            gradientType='greenToBlue'
          >
            体験入部
          </GradientButtonWithIconAndArrow>
          <GradientButtonWithIconAndArrow
            to={`${USER_ROUTE_PATH_MAP.TOP}#contact`}
            icon={<Woman width='1.5rem' height='1.5rem' />}
            gradientType='redToOrange'
          >
            案件の依頼
          </GradientButtonWithIconAndArrow>
        </Flex>
      </>
    );
  };

  const HeaderContentsForStartedLocation = () => {
    return (
      <>
        <Flex
          spacing='1.5rem'
          style={css`
            align-items: center;
          `}
        >
          <Link
            to={USER_ROUTE_PATH_MAP.TOP}
            css={css`
              width: 7.18rem;
              &:hover {
                cursor: pointer;
              }
            `}
          >
            <DarkMakeIT />
          </Link>
          <BlackNavigation />
          <BlackGithubButton />
        </Flex>

        <Flex
          spacing='1rem'
          style={css`
            align-items: center;
          `}
        >
          <GradientButtonWithIconAndArrow
            to={`${USER_ROUTE_PATH_MAP.TOP}#contact`}
            icon={<Man width='1.5rem' height='1.5rem' />}
            gradientType='greenToBlue'
          >
            体験入部
          </GradientButtonWithIconAndArrow>
          <GradientButtonWithIconAndArrow
            to={`${USER_ROUTE_PATH_MAP.TOP}#contact`}
            icon={<Woman width='1.5rem' height='1.5rem' />}
            gradientType='redToOrange'
          >
            案件の依頼
          </GradientButtonWithIconAndArrow>
        </Flex>
      </>
    );
  };

  return (
    <header
      css={css`
        width: 100%;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        padding: 1.25rem 0;
        display: flex;
        justify-content: space-around;
        transition: 0.3s;

        ${isStartingLocationInThisPage ? forStartingLocation : forStartedLocation}
      `}
    >
      {isStartingLocationInThisPage ? <HeaderContentsForStartingLocation /> : <HeaderContentsForStartedLocation />}
    </header>
  );
};
