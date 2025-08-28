'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { register, type RegisterActionState } from '../actions';
import { toast } from '@/components/toast';
import { useSession } from 'next-auth/react';
import { GuestPasswordModal } from '@/components/guest-password-modal';

export default function Page() {
  const router = useRouter();
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showRegistrationPasswordModal, setShowRegistrationPasswordModal] = useState(false);

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: 'idle',
    },
  );

  const { update: updateSession } = useSession();

  useEffect(() => {
    if (state.status === 'user_exists') {
      toast({ type: 'error', description: 'Account already exists!' });
    } else if (state.status === 'failed') {
      toast({ type: 'error', description: 'Failed to create account!' });
    } else if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: 'Failed validating your submission!',
      });
    } else if (state.status === 'success') {
      // Show guest password modal for registration
      setShowRegistrationPasswordModal(true);
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  const handleGuestSuccess = () => {
    router.push('/');
  };

  const handleRegistrationPasswordSuccess = () => {
    toast({ type: 'success', description: 'Registration completed successfully!' });
    setShowRegistrationPasswordModal(false);
    updateSession();
    router.refresh();
    router.push('/');
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Join MusicAI</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Create an account or try as a guest
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
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or create an account</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {'Already have an account? '}
            <Link
              href="/login"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign in
            </Link>
            {' instead.'}
          </p>
        </AuthForm>

        {/* Guest Access Modal */}
        <GuestPasswordModal
          isOpen={showGuestModal}
          onClose={() => setShowGuestModal(false)}
          onSuccess={handleGuestSuccess}
          title="Guest Access"
          description="Enter the password to access MusicAI features"
          buttonText="Access as Guest"
        />

        {/* Registration Password Verification Modal */}
        <GuestPasswordModal
          isOpen={showRegistrationPasswordModal}
          onClose={() => setShowRegistrationPasswordModal(false)}
          onSuccess={handleRegistrationPasswordSuccess}
          title="Registration Verification"
          description="Please enter the password to complete your registration"
          buttonText="Complete Registration"
        />
      </div>
    </div>
  );
}
