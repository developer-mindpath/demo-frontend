import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

import LoginPic from '@/assets/images/Mobile login-amico.svg';
import TextInputField from '@/components/ui/textInputField';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import AuthForm from '@/components/customAuthForm';

import { useSignInController } from './signIn.controller';

/**
 * @function SignIn Page
 * @returns {JSX.Element}
 */
export default function SignIn(): JSX.Element {
  const { getters, handlers } = useSignInController();
  const { isVisible, email, password } = getters;
  const {
    togglePasswordVisibility,
    onSubmit,
    onEmailChange,
    onPasswordChange,
    redirectToSignUp,
  } = handlers;

  return (
    <div className="bg-slate-50 h-screen w-full">
      <div className="grid px-4 py-8 lg:grid-cols-12 lg:gap-20 lg:py-16 h-full">
        <div className="mr-auto place-self-center hidden lg:col-span-6 w-full lg:block">
          <Image
            className="mx-auto hidden lg:flex object-fill"
            src={LoginPic}
            alt="illustration"
            width={1000}
          />
        </div>
        <div className="w-full place-self-center lg:col-span-6">
          <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto lg:py-0">
            <AuthForm
              title="Sign in to your account"
              onSubmit={onSubmit}
              footerText="Need an account?"
              footerLinkText="Sign Up"
              onFooterLinkClick={redirectToSignUp}
            >
              <TextInputField
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={onEmailChange}
                startIcon={
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: '#6b7280' }}
                  />
                }
              />
              <TextInputField
                type={isVisible ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={onPasswordChange}
                startIcon={
                  <FontAwesomeIcon icon={faLock} style={{ color: '#6b7280' }} />
                }
                endIcon={
                  <div
                    className="cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={isVisible ? faEyeSlash : faEye}
                      className="text-black"
                    />
                  </div>
                }
              />
              <Button
                type="submit"
                className="w-full text-white focus:bg-primary-800 bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-md px-5 py-2.5 text-center"
              >
                Sign In
              </Button>
            </AuthForm>
          </div>
        </div>
      </div>
    </div>
  );
}
