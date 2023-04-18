import { css } from '@emotion/react';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Flex } from 'src/components/atoms/Layout/Flex';
import { DarkMakeIT } from 'src/components/atoms/Logo/DarkMakeIT';
import { WhiteMakeIT } from 'src/components/atoms/Logo/WhiteMakeIT';
import { GradientButtonWithIconAndArrow } from 'src/components/molecules/user/Button/GradientButtonWithIconAndArrow';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';
import { CONSTANT_CONTACT_CATEGORIE } from '../../constants/ContactCategories';
import { Man } from 'src/components/atoms/Button/Icon/Man';
import { Woman } from 'src/components/atoms/Button/Icon/Woman';

type HeaderForMobileProps = {
  isOpenedMenu: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

export const HeaderForMobile = ({ isOpenedMenu, handleClose, handleOpen }: HeaderForMobileProps) => {
  const navigationList: { to: string; title: string }[] = [
    {
      to: `${USER_ROUTE_PATH_MAP.TOP}#about`,
      title: 'Make ITについて',
    },
    {
      to: `${USER_ROUTE_PATH_MAP.TOP}#notification`,
      title: '新着情報',
    },
    {
      to: `${USER_ROUTE_PATH_MAP.TOP}#work`,
      title: '実績',
    },
    {
      to: `${USER_ROUTE_PATH_MAP.TOP}#members`,
      title: 'メンバー',
    },
  ];

  return (
    <>
      <header
        css={css`
          width: 100%;
          z-index: 100;
          position: fixed;
          top: 0;
          left: 0;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          column-gap: 2rem;
          background-color: #fff;
          box-shadow: 0 4px 4px rgba(51, 51, 51, 0.1);
        `}
      >
        <FontAwesomeIcon
          css={css`
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={handleOpen}
          color='#333'
          size='2xl'
          icon={faBars}
        />

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
      </header>

      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: -100vw;
          transition: all 0.3s 0s ease;
          opacity: 0;
          position: fixed;
          background-color: #333;
          z-index: 200;

          ${isOpenedMenu
            ? css`
                left: 0;
                opacity: 1;
              `
            : css``}
        `}
      >
        <FontAwesomeIcon
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            z-index: 201;
            padding: 1.25rem;
            left: -100vw;
            transition: all 0.5s 0s ease;

            &:hover {
              cursor: pointer;
            }

            ${isOpenedMenu
              ? css`
                  left: 0;
                `
              : css``}
          `}
          color='#fff'
          size='4x'
          icon={faClose}
          onClick={handleClose}
        />

        <nav
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 2rem;
            width: 25rem;
          `}
        >
          <Link
            to={USER_ROUTE_PATH_MAP.TOP}
            css={css`
              &:hover {
                cursor: pointer;
              }
            `}
          >
            <WhiteMakeIT />
          </Link>

          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 2rem;
              column-gap: 1rem;
            `}
            onClick={handleClose}
          >
            <GradientButtonWithIconAndArrow
              to={`${USER_ROUTE_PATH_MAP.TOP}?contactCategory=${CONSTANT_CONTACT_CATEGORIE.EXPERIENCE}#contact`}
              icon={<Man width='1.5rem' height='1.5rem' />}
              gradientType='greenToBlue'
            >
              体験入部
            </GradientButtonWithIconAndArrow>
            <GradientButtonWithIconAndArrow
              to={`${USER_ROUTE_PATH_MAP.TOP}?contactCategory=${CONSTANT_CONTACT_CATEGORIE.PROJECT}#contact`}
              icon={<Woman width='1.5rem' height='1.5rem' />}
              gradientType='redToOrange'
            >
              案件の依頼
            </GradientButtonWithIconAndArrow>
          </div>

          <ul
            css={css`
              display: flex;
              flex-direction: column;
              row-gap: 2rem;
              list-style: none;
              padding: 0;
            `}
          >
            {navigationList.map((navigation, index) => (
              <li key={index} onClick={handleClose}>
                <Link
                  to={navigation.to}
                  css={css`
                    display: block;
                    text-decoration: none;
                    color: #fff;
                    font-size: 2rem;
                    font-weight: 550;
                    font-family: 'Hiragino Kaku Gothic Pro';
                  `}
                >
                  {navigation.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
