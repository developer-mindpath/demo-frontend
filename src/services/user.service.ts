import { BASE_URL } from '@/lib/environment';
import { IUserResponse } from '@/pages/profile/profile.controller';
import ApiHelper from '@/utils/apiHelper';

export class UserService {
  public static async getUserProfile(token: string) {
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
      return res;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}
