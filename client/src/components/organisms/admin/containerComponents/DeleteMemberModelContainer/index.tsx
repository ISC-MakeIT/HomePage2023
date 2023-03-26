import { apiDeleteMember } from '@api/member';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { DeleteMemberModel } from '../../presentationalComponents/DeleteMemberModel';

type DeleteMemberModelContainerProps = {
  memberId: number;
};

export const DeleteMemberModelContainer = ({ memberId }: DeleteMemberModelContainerProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const userToken = useAppSelector(selectUserToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === '') {
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.LOGIN);
      return;
    }
  }, []);

  const handleDeleteMember = async () => {
    const response = await apiDeleteMember(userToken, memberId);
  };

  return (
    <DeleteMemberModel
      isActive={isActive}
      handleOpen={() => setIsActive(true)}
      handleClose={() => setIsActive(false)}
      handleDeleteMember={handleDeleteMember}
    />
  );
};
