import { addAlertToAlertList, Alert, popFromAlertList } from '@redux/actions/alert/alertListReducer';
import { useAppDispatch } from '@redux/hooks';

export const useAlert = () => {
  const dispatch = useAppDispatch();

  return {
    show: (alert: Alert) => {
      dispatch(addAlertToAlertList(alert));

      setTimeout(() => {
        dispatch(popFromAlertList());
      }, 5000);
    },
  };
};
