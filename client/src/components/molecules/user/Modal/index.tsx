import { css } from '@emotion/react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

interface ModalProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  handleClose: () => void;
}

export const Modal = ({ width, height, children, handleClose }: ModalProps) => {
  const modalBackgroundElement = useRef<HTMLDivElement>(null);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(51, 51, 51, 0.5);
        z-index: 300;
      `}
      ref={modalBackgroundElement}
      onClick={(e) => {
        if (e.target === modalBackgroundElement.current) {
          handleClose();
        }
      }}
    >
      <div
        css={css`
          max-height: 90vh;
          max-width: 80vw;
          overflow: auto;
          background-color: #fff;
          box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px,
            rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
          padding: 2rem;
          width: ${width ?? '37.5rem'};
          height: ${height ?? '37.5rem'};
        `}
      >
        <FontAwesomeIcon
          css={css`
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={handleClose}
          size="3x"
          icon={faClose}
        />
        {children}
      </div>
    </div>
  );
};
