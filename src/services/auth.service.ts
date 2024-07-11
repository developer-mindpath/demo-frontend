import { BASE_URL } from '@/lib/environment';
import { ISignInResponse } from '@/pages/signIn/signIn.controller';
import { IRequestPayload, ISignUpResponse } from '@/pages/signUp/interface';
import ApiHelper from '@/utils/apiHelper';

/**
 * @class AuthService
 */
export class AuthService {
  /**
   * @function Sign In service
   * @param {FormData} formData
   * @returns {Promise<ISignInResponse>}
   */
  public static async signIn(formData: FormData): Promise<ISignInResponse> {
    const user = {
      email: formData.get('email') ?? '',
      password: formData.get('password') ?? '',
    };
    const response = await ApiHelper.fetchApi<ISignInResponse>(
      `${BASE_URL}/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    );
    return response;
  }

  /**
   * @functions Sign Up service
   * @param {IRequestPayload} formData
   * @returns {Promise<ISignUpResponse>}
   */
  public static async signUp(
    formData: IRequestPayload,
  ): Promise<ISignUpResponse> {
    const user = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    const response = await ApiHelper.fetchApi<ISignUpResponse>(
      `${BASE_URL}/api/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    );
    return response;
  }
}
