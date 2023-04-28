import { Stack } from '@mui/system';
import { initAlertList, selectAlertList } from '@redux/actions/alert/alertListReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { AlertForSuccess } from 'src/components/molecules/admin/AlertForSuccess';

interface AlertProviderProps {
  children?: React.ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const dispatch = useDispatch();
  const alertList = useSelector(selectAlertList);

  useEffect(() => {
    dispatch(initAlertList());
  }, []);

  const AlertList = () => {
    return (
      <Stack
        sx={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          zIndex: 1400,
        }}
        spacing={2}
      >
        {alertList.map((alert, index) => {
          if (alert.type === 'error') {
            return <AlertForError key={index} error={alert.content} sx={{ boxShadow: 24 }} />;
          }
          if (alert.type === 'success') {
            return <AlertForSuccess key={index} content={alert.content} sx={{ boxShadow: 24 }} />;
          }
          throw Error('まだ、そのデザインのAlertに対応してないよ。\n実装してね♡');
        })}
      </Stack>
    );
  };

  return (
    <>
      {children}
      <AlertList />
    </>
  );
};
