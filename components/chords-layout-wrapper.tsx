'use client';

import { Button } from '@/components/ui/button';
import { Menu, User, LogOut, LogIn, UserPlus, Sparkles, X } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User as UserType } from 'next-auth';
import { signOut, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '@/components/footer';
import { usePathname } from 'next/navigation';

interface ChordsLayoutWrapperProps {
    user: UserType | undefined;
    children: React.ReactNode;
}

function GuestPasswordModal({ isOpen, onClose }: {
    isOpen: boolean;
    onClose: () => void;
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
                onClose();
                window.location.reload();
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
                    <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
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
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="flex-1">
                            {isLoading ? 'Signing in...' : 'Access as Guest'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function SimpleUserMenu({ user }: { user: UserType | undefined; }) {
    if (!user) return null;

    const isGuest = user.type === 'guest';

    return (
        <div className="p-2">
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">
                    {isGuest ? 'Guest User' : user.email}
                </span>
                {isGuest && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Guest
                    </span>
                )}
            </div>
            <DropdownMenuSeparator />
            {isGuest && (
                <DropdownMenuItem asChild>
                    <Link href="/login" className="cursor-pointer">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in
                    </Link>
                </DropdownMenuItem>
            )}
            <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: '/' })}
                className="cursor-pointer text-red-600 focus:text-red-600"
            >
                <LogOut className="mr-2 h-4 w-4" />
                {isGuest ? 'Exit Guest Mode' : 'Sign out'}
            </DropdownMenuItem>
        </div>
    );
}

function AuthButtons({ user }: { user: UserType | undefined; }) {
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Debug dropdown state changes
    useEffect(() => {
        if (dropdownOpen) {
            console.log('Dropdown opened - checking for layout shifts');
            // Log the current body styles to see if anything changed
            console.log('Body margin:', document.body.style.margin);
            console.log('Body padding:', document.body.style.padding);
        }
    }, [dropdownOpen]);

    if (user) {
        return (
            <DropdownMenu onOpenChange={setDropdownOpen} modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                        <Menu className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-56"
                    sideOffset={8}
                    alignOffset={0}
                    avoidCollisions={true}
                    collisionBoundary={document.body}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                >
                    <SimpleUserMenu user={user} />
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signIn()}
                    className="flex items-center gap-2"
                >
                    <LogIn className="h-4 w-4" />
                    Sign In
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowGuestModal(true)}
                    className="flex items-center gap-2"
                >
                    <Sparkles className="h-4 w-4" />
                    Try as Guest
                </Button>
                <Link href="/register">
                    <Button variant="default" size="sm">
                        <UserPlus className="h-4 w-4" />
                        Sign Up
                    </Button>
                </Link>
            </div>

            <GuestPasswordModal
                isOpen={showGuestModal}
                onClose={() => setShowGuestModal(false)}
            />
        </>
    );
}

export function ChordsLayoutWrapper({ user: initialUser, children }: ChordsLayoutWrapperProps) {
    const { data: session, status } = useSession();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    // Use session data if available, otherwise fall back to initial user prop
    const user = session?.user || initialUser;

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // Determine if the current page is an authentication page
    const isAuthPage = pathname?.includes('/login') || pathname?.includes('/register');

    // Show loading state during session check to prevent hydration mismatch
    if (!mounted || status === 'loading') {
        return (
            <div className="flex flex-col">
                <div className="bg-background border-b p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">MusicAI</h1>
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-20 bg-gray-200 animate-pulse rounded" />
                        <div className="h-10 w-20 bg-gray-200 animate-pulse rounded" />
                    </div>
                </div>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && (
                <div className="bg-background border-b p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">MusicAI</h1>
                    <AuthButtons user={user} />
                </div>
            )}
            <main className={isAuthPage ? "" : "flex-1"}>
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
}
