import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useSessionCheck() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/signin');
    },
  });
  return {
    status,
    session,
  };
}
