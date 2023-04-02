import { hideProcessingLine, showProcessingLine } from '@redux/actions/processingLine';

export const useProcessingLine = () => {
  return {
    show: () => {
      showProcessingLine();
    },
    hide: () => {
      hideProcessingLine();
    },
  };
};
