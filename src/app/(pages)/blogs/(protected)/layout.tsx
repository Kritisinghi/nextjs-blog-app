import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react';

interface ProtectedLayoutProps {
    children: React.ReactNode
}
const ProtectedLayout: React.FC<ProtectedLayoutProps> = async ({children}) => {
    const {userId, redirectToSignIn} = await auth();

    if (!userId) return redirectToSignIn();

    return (
        <Suspense fallback={<>Loading</>}>
           {children}
        </Suspense>
    )
}

export default ProtectedLayout;