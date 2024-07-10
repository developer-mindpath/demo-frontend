import { BASE_URL } from '@/lib/environment';
import { ISignInResponse } from '@/pages/signIn/signIn.controller';
import { IRequestPayload } from '@/pages/signUp/interface';
import ApiHelper from '@/utils/apiHelper';

export class AuthService {
  public static async signIn(formData: FormData) {
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

  public static async signUp(formData: IRequestPayload) {
    const user = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    const response = await ApiHelper.fetchApi(`${BASE_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response;
  }
}
