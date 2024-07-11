import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import AuthForm from '@/components/customAuthForm';
import LoginPic from '@/assets/images/Mobile login-amico.svg';
import TextInputField from '@/components/ui/textInputField';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import CountdownCard from '@/components/countDownCard';

import { useSignUpController } from './signUp.controller';

/**
 * @function SignUp Page
 * @returns {JSX.Element}
 */
export default function SignUp(): JSX.Element {
  const { getters, handlers } = useSignUpController();
  const {
    confirmPassword,
    firstName,
    isShowConfirmPassword,
    isShowPassword,
    lastName,
    email,
    password,
    isSignedUp,
    errorMessage,
  } = getters;
  const {
    togglePasswordVisibility,
    onSubmit,
    onPasswordChange,
    setEmail,
    setFirstName,
    setIsShowConfirmPassword,
    setLastName,
    onConfirmPasswordChange,
    redirectToSignIn,
  } = handlers;

  return (
    <section className="bg-slate-50 h-screen">
      <div className="mx-auto grid px-4 py-8 lg:grid-cols-12 lg:gap-20 lg:py-16 h-full">
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
            {isSignedUp ? (
              <CountdownCard />
            ) : (
              <AuthForm
                title="Sign Up"
                onSubmit={onSubmit}
                footerText="Already have an account?"
                footerLinkText="Sign In"
                onFooterLinkClick={redirectToSignIn}
              >
                <TextInputField
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  required
                  label="First name*"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event?.target.value);
                  }}
                  startIcon={
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: '#6b7280' }}
                    />
                  }
                />
                <TextInputField
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name (Optional)"
                  value={lastName}
                  label="Last name"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                  startIcon={
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: '#6b7280' }}
                    />
                  }
                />
                <TextInputField
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required
                  label="Email*"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  startIcon={
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ color: '#6b7280' }}
                    />
                  }
                />
                <TextInputField
                  type={isShowPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  label="Password*"
                  value={password}
                  onChange={onPasswordChange}
                  startIcon={
                    <FontAwesomeIcon
                      icon={faLock}
                      style={{ color: '#6b7280' }}
                    />
                  }
                  endIcon={
                    <div
                      className="cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={isShowPassword ? faEyeSlash : faEye}
                        className="text-black"
                      />
                    </div>
                  }
                />
                <TextInputField
                  type={isShowConfirmPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Confirm Password"
                  required
                  label="Confirm Password*"
                  value={confirmPassword}
                  onChange={onConfirmPasswordChange}
                  startIcon={
                    <FontAwesomeIcon
                      icon={faLock}
                      style={{ color: '#6b7280' }}
                    />
                  }
                  endIcon={
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setIsShowConfirmPassword(!isShowConfirmPassword);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={isShowConfirmPassword ? faEyeSlash : faEye}
                        className="text-black"
                      />
                    </div>
                  }
                />
                {errorMessage && (
                  <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                )}
                <Button
                  type="submit"
                  className="w-full text-white focus:bg-primary-800 bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-md px-5 py-2.5 text-center"
                >
                  Sign Up
                </Button>
              </AuthForm>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
