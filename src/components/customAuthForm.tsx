import React, { ReactNode } from 'react';

interface AuthFormProps {
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  onFooterLinkClick: () => void;
}

/**
 * @function AuthForm
 * @param {AuthFormProps}
 * @returns {JSX.Element}
 */
const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  children,
  footerText,
  footerLinkText,
  onFooterLinkClick,
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg shadow-gray-400 md:mt-0 sm:max-w-md xl:p-0 border">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          {title}
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
          {children}
        </form>
        <div className="flex items-center justify-center">
          <div className="text-sm">{footerText}</div>
          <a
            onClick={onFooterLinkClick}
            className="cursor-pointer text-sm pl-1 hover:text-blue-700 underline"
          >
            {footerLinkText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
