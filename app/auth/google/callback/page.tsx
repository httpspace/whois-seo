'use client'

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { exchangeGoogleCode } from '@/lib/api';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const err = searchParams.get('error');

    if (err) {
      setError('Google 授權被取消或發生錯誤。');
      return;
    }

    if (!code) {
      setError('未收到授權碼。');
      return;
    }

    exchangeGoogleCode(code).then(result => {
      if (!result) {
        setError('登入失敗，請稍後再試。');
        return;
      }
      login(result.user, result.token);
      router.replace('/');
    });
  }, [searchParams, login, router]);

  if (error) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <p className="text-sm text-muted-foreground">{error}</p>
        <button
          onClick={() => router.push('/login')}
          className="text-sm text-primary hover:underline"
        >
          返回登入頁
        </button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto">
        <img src="/logo.webp" alt="Whoisvibe" className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        登入中…
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Suspense fallback={
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          載入中…
        </div>
      }>
        <CallbackHandler />
      </Suspense>
    </div>
  );
}
