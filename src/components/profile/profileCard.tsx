import React from 'react';

import UserImage from '@/assets/images/user.jpg';

import Image from '../ui/image';

interface ProfileCardProps {
  name: string;
  email: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  className,
}) => {
  return (
    <div
      className={`bg-white p-8 rounded-lg shadow-lg text-center mb-4 ${className}`}
    >
      <Image
        src={UserImage}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-lg text-gray-700">{email}</p>
    </div>
  );
};

export default ProfileCard;
