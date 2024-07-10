export class ApiHelper {
  public static async fetchApi<T>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    const fetchOptions: RequestInit = {
      ...options,
      credentials: 'include',
    };
    try {
      const response = await fetch(url, fetchOptions);
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.detail);
      }
    } catch (error) {
      throw error;
    }
  }
}

export default ApiHelper;
