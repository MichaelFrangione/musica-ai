import { auth } from '@/app/(auth)/auth';
import { ChordsLayoutWrapper } from '@/components/chords-layout-wrapper';

export default async function ChordsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <ChordsLayoutWrapper user={session?.user}>
            {children}
        </ChordsLayoutWrapper>
    );
}
