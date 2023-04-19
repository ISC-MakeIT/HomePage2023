import { LinearProgress } from '@mui/joy';
import { initProcessingLineState, selectProcessingLine } from '@redux/actions/processingLine';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useEffect } from 'react';

interface ProcessingLineProviderProps {
  children?: React.ReactNode;
}

export const ProcessingLineProvider = ({ children }: ProcessingLineProviderProps) => {
  const proccessingLineState = useAppSelector(selectProcessingLine);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initProcessingLineState());
  }, []);

  if (proccessingLineState) {
    return (
      <>
        {children}
        <LinearProgress color="primary" size="md" sx={{ position: 'fixed', top: 2, left: 0, width: '100vw' }} />
      </>
    );
  }

  return <>{children}</>;
};
