import { css } from '@emotion/react';
import { Flex } from 'src/components/atoms/Layout/Flex';
import { GreyMediumText } from 'src/components/atoms/Text/GreyMediumText';
import { RedMediumBoldText } from 'src/components/atoms/Text/RedMediumBoldText';
import { WhiteMediumBoldText } from 'src/components/atoms/Text/WhiteMediumBoldText';
import { maxScreen } from 'src/modules/helpers/mediaQueries';
import { Modal } from '../Modal';
import { BlackLargeTitle } from 'src/components/atoms/Title/BlackLargeTitle';
import { useState } from 'react';

interface NotificationProps {
  title: string;
  contents: string;
  createdAt: string;
}

export const Notification = ({ title, contents, createdAt }: NotificationProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const hasFullWidthChar = (str: string) => {
    return Boolean(str.match(/[\x01-\x7E\uFF65-\uFF9F]/));
  };

  const isWithinByteRange = (currentByte: number, startByte: number, byteLength: number, charByteSize: number) => {
    return currentByte >= startByte && currentByte + charByteSize <= startByte + byteLength;
  };

  const isByteLengthExceeded = (currentByte: number, startByte: number, byteLength: number) => {
    return currentByte > startByte + byteLength;
  };

  const getSubstringByByte = (str: string, startByte: number, byteLength: number) => {
    let result = '';
    let currentByte = 0;

    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      const charByteSize = hasFullWidthChar(char) ? 2 : 1;

      if (isWithinByteRange(currentByte, startByte, byteLength, charByteSize)) {
        result += char;
      }

      currentByte += charByteSize;

      if (isByteLengthExceeded(currentByte, startByte, byteLength)) {
        result += '...';
        break;
      }
    }

    return result;
  };

  const processedTitle = getSubstringByByte(title, 0, 48);

  return (
    <>
      <div
        onClick={() => {
          setIsOpened(true);
        }}
        css={css`
          background-color: #fff;
          border-radius: 1.25rem;
          padding: 1rem 3rem;
          transition: 0.3s;
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          column-gap: 2rem;

          &:hover {
            background-color: #ddd;
            cursor: pointer;
          }

          ${maxScreen(440)} {
            display: block;
          }
        `}
      >
        <Flex
          spacing="2rem"
          style={css`
            align-items: center;
          `}
        >
          <GreyMediumText>{createdAt}</GreyMediumText>
          <div
            css={css`
              background-color: #fa5d36;
              height: 1.5rem;
              border-radius: 1.25rem;
              padding: 0.5rem 2rem;
              font-weight: 400;
              margin-right: 1rem;
              flex-grow: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <WhiteMediumBoldText>お知らせ</WhiteMediumBoldText>
          </div>
        </Flex>
        <div
          css={css`
            line-height: 2;
          `}
        >
          <RedMediumBoldText>{processedTitle}</RedMediumBoldText>
        </div>
      </div>

      {isOpened ? (
        <Modal
          handleClose={() => {
            setIsOpened(false);
          }}
        >
          <div
            css={css`
              word-break: break-all;
            `}
          >
            <div
              css={css`
                line-height: 1.5;
              `}
            >
              <BlackLargeTitle>{title}</BlackLargeTitle>
              <GreyMediumText>{contents}</GreyMediumText>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};
