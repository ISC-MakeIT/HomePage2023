import { addAlertToAlertList, Alert, popFromAlertList } from '@redux/actions/alert/alertListReducer';
import { useAppDispatch } from '@redux/hooks';

export const useAlert = () => {
  const dispatch = useAppDispatch();

  return {
    show: (alert: Alert, milliSecondCountsToHide: number = 5000) => {
      dispatch(addAlertToAlertList(alert));

      setTimeout(() => {
        dispatch(popFromAlertList());
      }, milliSecondCountsToHide);
    },
  };
};
