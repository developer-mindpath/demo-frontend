import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import {
  SOMETHING_WENT_WRONG,
  TOKEN_MISSING,
} from '@/constants/snackbarMessage';
import { UserService } from '@/services/user.service';

interface IUser {
  username: string;
  email: string;
}

interface IUserDetail {
  address: string;
  profession: string;
  company: string;
  experience: string;
  techStack: string[];
}

export interface IUserResponse {
  username: string;
  email: string;
  message: string;
}

interface IProfileController {
  getters: {
    user: IUser;
    loading: boolean;
    userDetail: IUserDetail;
  };
  handlers: { handleLogout: () => void };
}

/**
 * @controller Profile controller
 * @returns {IProfileController}
 */
export const useProfileController = (): IProfileController => {
  //react State
  const [user, setUser] = useState<{ username: string; email: string }>({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  //Router
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const userDetail = {
    address: '123 Main St, Anytown, UK',
    profession: 'Software Developer',
    company: 'Mindpath Tech',
    experience: '5 years',
    techStack: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
  };

  /**
   * @function To fetch the user detail
   */
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      enqueueSnackbar(TOKEN_MISSING, { variant: 'error' });
      navigate('/signIn');
      return;
    }
    try {
      const userData = await UserService.getUserProfile(token);
      setUser({ username: userData.username, email: userData.email });
    } catch (error) {
      enqueueSnackbar(SOMETHING_WENT_WRONG, { variant: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  /**
   * @function For Logout
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signIn');
  };

  return {
    getters: {
      user,
      loading,
      userDetail,
    },
    handlers: { handleLogout },
  };
};
