import { BASE_URL } from '@/lib/environment';
import { IUserResponse } from '@/pages/profile/profile.controller';
import ApiHelper from '@/utils/apiHelper';

/**
 * @class User service
 */
export class UserService {
  /**
   * @function For fetching user's profile
   * @param {string} token
   * @returns {Promise<IUserResponse>}
   */
  public static async getUserProfile(token: string): Promise<IUserResponse> {
    try {
      const res = await ApiHelper.fetchApi<IUserResponse>(
        `${BASE_URL}/api/user`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      console.log(res);
      return res;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}
