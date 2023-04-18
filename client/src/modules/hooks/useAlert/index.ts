import { addAlertToAlertList, type Alert, popFromAlertList } from '@redux/actions/alert/alertListReducer';
import { useAppDispatch } from '@redux/hooks';

export const useAlert = () => {
  const dispatch = useAppDispatch();

  const show = (alert: Alert, milliSecondCountsToHide = 5000) => {
    dispatch(addAlertToAlertList(alert));

    setTimeout(() => {
      dispatch(popFromAlertList());
    }, milliSecondCountsToHide);
  };

  const delayShow = (alert: Alert, milliSecondCountsToHide = 5000, delayMilliSecondCounts = 1000) => {
    setTimeout(() => {
      show(alert, milliSecondCountsToHide);
    }, delayMilliSecondCounts);
  };

  return {
    show,
    delayShow,
  };
};
