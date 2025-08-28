import { auth } from '@/app/(auth)/auth';
import { TestWrapper } from '@/components/test-wrapper';

export default async function ChordsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <TestWrapper user={session?.user}>
            {children}
        </TestWrapper>
    );
}
