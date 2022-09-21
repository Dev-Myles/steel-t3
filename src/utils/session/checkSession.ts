import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useSessionCheck(redirect: boolean) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      if (redirect) {
        return router.push('/auth/signin');
      }
    },
  });
  return {
    status,
    session,
  };
}
