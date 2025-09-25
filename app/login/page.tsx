'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/Button';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get('redirect') || '/';

  const handleLogin = async () => {
    const res = await signIn('github', { redirect: false });
    if (res?.ok) {
      router.push(redirect);
    }
  };

  return (
    <Button className="w-full mb-2" onClick={() => signIn('github')}>
        <FaGithub className="h-5 w-10" />
        Sign in with GitHub
    </Button>
  )
}
