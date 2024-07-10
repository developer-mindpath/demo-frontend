import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { AuthService } from '@/services/auth.service';

interface ISignUpController {
  getters: {
    email: string;
    password: string;
    isShowPassword: boolean;
    firstName: string;
    isShowConfirmPassword: boolean;
    lastName: string;
    confirmPassword: string;
    errorMessage: string;
    isSignedUp: boolean;
  };
  handlers: {
    togglePasswordVisibility: () => void;
    onSubmit: (event: FormEvent) => Promise<void>;
    onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setIsShowPassword: Dispatch<SetStateAction<boolean>>;
    setIsShowConfirmPassword: Dispatch<SetStateAction<boolean>>;
    setFirstName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setEmail: Dispatch<SetStateAction<string>>;
    onConfirmPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
    redirectToSignIn: () => void;
  };
}

/**
 * @controller SignUp controller
 * @returns {ISignUpController}
 */
export const useSignUpController = (): ISignUpController => {
  //React State
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  //Router
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  /**
   * @function For toggle show password
   */
  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  /**
   * @function On changing the mail
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  /**
   * @function On Changing the password
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    if (password === event.target.value) {
      setErrorMessage('');
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Password must be same');
      return;
    }
    if (firstName.length && email.length && password.length) {
      const formData = {
        firstName,
        lastName,
        email,
        password,
      };

      try {
        await AuthService.signUp(formData);
        enqueueSnackbar('SignUp Successfully !!', {
          variant: 'success',
        });
        setIsSignedUp(true);
      } catch (error) {
        enqueueSnackbar('An Error Occurred', {
          variant: 'error',
        });
      }
    }
  };

  /**
   * To redirect to Sign Up page
   */
  const redirectToSignIn = () => {
    navigate('/signIn');
  };

  return {
    getters: {
      email,
      password,
      confirmPassword,
      firstName,
      isShowConfirmPassword,
      isShowPassword,
      lastName,
      errorMessage,
      isSignedUp,
    },
    handlers: {
      togglePasswordVisibility,
      onSubmit,
      onEmailChange,
      onPasswordChange,
      setEmail,
      setFirstName,
      setIsShowConfirmPassword,
      setIsShowPassword,
      setLastName,
      onConfirmPasswordChange,
      redirectToSignIn,
    },
  };
};
