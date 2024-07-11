import React from 'react';

interface ProfileDetailsProps {
  name: string;
  email: string;
  address: string;
  profession: string;
  company: string;
  experience: string;
  techStack: string[];
}

/**
 * @function Profile detail
 * @param {ProfileDetailsProps}
 * @returns {JSX.Element}
 */
const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  name,
  email,
  address,
  profession,
  company,
  experience,
  techStack,
}): JSX.Element => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-left w-full">
      <h3 className="text-xl font-bold mb-4">Profile Details</h3>
      <div className="mb-2">
        <strong>Name: </strong>
        <span>{name}</span>
      </div>
      <div className="mb-2">
        <strong>Email: </strong>
        <span>{email}</span>
      </div>
      <div className="mb-2">
        <strong>Address: </strong>
        <span>{address}</span>
      </div>
      <div className="mb-2">
        <strong>Profession: </strong>
        <span>{profession}</span>
      </div>
      <div className="mb-2">
        <strong>Company: </strong>
        <span>{company}</span>
      </div>
      <div className="mb-2">
        <strong>Experience: </strong>
        <span>{experience}</span>
      </div>
      <div className="mb-2">
        <strong>Tech Stack: </strong>
        <span>{techStack.join(', ')}</span>
      </div>
    </div>
  );
};

export default ProfileDetails;
