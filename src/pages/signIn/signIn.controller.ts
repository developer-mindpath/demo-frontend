import { ChangeEvent, FormEvent, useState } from 'react';
import crypto from 'crypto';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ENCRYPTION_KEY } from '@/lib/environment';
import { AuthService } from '@/services/auth.service';
import { ERROR_OCCURRED, LOGIN_SUCCESSFUL } from '@/constants/snackbarMessage';

export interface ISignInResponse {
  message: string;
  token: string;
}

interface ISignInController {
  getters: {
    isVisible: boolean;
    email: string;
    password: string;
  };
  handlers: {
    togglePasswordVisibility: () => void;
    onSubmit: (event: FormEvent) => Promise<void>;
    onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
    redirectToSignUp: () => void;
  };
}

/**
 * @controller SignIn controller
 * @returns {ISignInController}
 */
export const useSignInController = (): ISignInController => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  /**
   * @function For toggle show password
   */
  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
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

  /**
   * to encrypt the data
   * @param {string} toEncrypt
   * @return {string}
   */
  const encryptStringWithRsaPublicKey = (toEncrypt: string): string => {
    const buffer = Buffer.from(toEncrypt);
    const encrypted = crypto.publicEncrypt(ENCRYPTION_KEY || '', buffer);
    return encrypted.toString('base64');
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const encryptedEmail = encryptStringWithRsaPublicKey(email);
      const encryptedPassword = encryptStringWithRsaPublicKey(password);

      const encryptedFormData = new FormData();
      encryptedFormData.append('email', encryptedEmail);
      encryptedFormData.append('password', encryptedPassword);

      const res = await AuthService.signIn(encryptedFormData);
      localStorage.setItem('token', res.token);
      enqueueSnackbar(LOGIN_SUCCESSFUL, {
        variant: 'success',
      });
      navigate('/profile');
    } catch (error) {
      enqueueSnackbar(ERROR_OCCURRED, {
        variant: 'error',
      });
    }
  };

  /**
   * To redirect to Sign Up page
   */
  const redirectToSignUp = () => {
    navigate('/signUp');
  };

  return {
    getters: {
      isVisible,
      email,
      password,
    },
    handlers: {
      togglePasswordVisibility,
      onSubmit,
      onEmailChange,
      onPasswordChange,
      redirectToSignUp,
    },
  };
};
