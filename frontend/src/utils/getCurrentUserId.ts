import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getCurrentUserId(): Promise<number | null> {

  // JWTを取得
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) return null;

  // ペイロードからユーザーIDを取得
  const payload = jwt.decode(token);

  if (typeof payload?.sub === 'number') {
    return payload.sub;
  }
  
  return null;
}

