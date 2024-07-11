import React from 'react';

import ProfileCard from '@/components/profile/profileCard';
import ProfileDetails from '@/components/profile/profileDetails';

import { useProfileController } from './profile.controller';

/**
 * @function Profile Page
 * @returns {JSX.Element}
 */
const Profile = (): JSX.Element => {
  const { getters, handlers } = useProfileController();
  const { loading, user, userDetail } = getters;
  const { handleLogout } = handlers;

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-full">
      {user && (
        <div className="flex flex-col md:flex-row items-center w-full max-w-4xl">
          <div className="md:w-1/3 w-full">
            <ProfileCard
              name={user.username}
              email={user.email}
              className="w-full"
            />
          </div>
          <div className="md:w-2/3 w-full p-4">
            <ProfileDetails
              name={user.username}
              email={user.email}
              address={userDetail.address}
              profession={userDetail.profession}
              company={userDetail.company}
              experience={userDetail.experience}
              techStack={userDetail.techStack}
            />
          </div>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
