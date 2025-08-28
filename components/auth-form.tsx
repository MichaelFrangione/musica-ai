'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthFormProps {
    action: (formData: FormData) => Promise<void>;
    defaultEmail?: string;
    children: React.ReactNode;
}

export function AuthForm({ action, defaultEmail, children }: AuthFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form action={action} className="space-y-4 px-4 sm:px-16">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    defaultValue={defaultEmail}
                    className="w-full"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    minLength={6}
                    className="w-full"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-auto p-1 text-xs"
                >
                    {showPassword ? 'Hide' : 'Show'} password
                </Button>
            </div>

            {children}
        </form>
    );
}
