
import { LoginFormData } from '@/app/types/auth/loginFormData';
import { fetchWithAuth } from '@/app/utils/fetchWithAuth';

export async function loginUser(data: LoginFormData): Promise<any> {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  return json;
}
