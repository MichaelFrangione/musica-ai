'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from '@/components/toast';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight, X } from 'lucide-react';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { login, type LoginActionState } from '../actions';
import { useSession } from 'next-auth/react';

function GuestPasswordModal({ isOpen, onClose, onSuccess }: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the guest password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('guest', {
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid guest password');
      } else {
        onSuccess();
        onClose();
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Guest Access</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Enter the guest password to access MusicAI features
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="guest-password">Guest Password</Label>
            <Input
              id="guest-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter guest password"
              className="mt-1"
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Signing in...' : 'Access as Guest'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [showGuestModal, setShowGuestModal] = useState(false);

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: 'idle',
    },
  );

  const { update: updateSession } = useSession();

  useEffect(() => {
    if (state.status === 'failed') {
      toast({
        type: 'error',
        description: 'Invalid credentials!',
      });
    } else if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: 'Failed validating your submission!',
      });
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  const handleGuestSuccess = () => {
    router.push('/');
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Welcome to MusicAI</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Sign in to your account or try as a guest
          </p>
        </div>

        {/* Guest Sign-in Option */}
        <div className="px-4 sm:px-16">
          <Button
            onClick={() => setShowGuestModal(true)}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 py-6 text-base"
          >
            <Sparkles className="h-5 w-5" />
            Try MusicAI as Guest
            <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="text-center text-xs text-gray-500 mt-2">
            Explore features without creating an account
          </p>
        </div>

        <div className="flex items-center px-4 sm:px-16">
          <div className="flex-1 border-t border-gray-300" />
          <span className="px-3 text-sm text-gray-500">or sign in with email</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign up
            </Link>
            {' for free.'}
          </p>
        </AuthForm>

        <GuestPasswordModal
          isOpen={showGuestModal}
          onClose={() => setShowGuestModal(false)}
          onSuccess={handleGuestSuccess}
        />
      </div>
    </div>
  );
}
