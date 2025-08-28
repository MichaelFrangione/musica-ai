'use client';

export function TestWrapper({ children }: { children: React.ReactNode; }) {
    console.log('TestWrapper is rendering!');

    return (
        <div style={{
            backgroundColor: 'purple',
            padding: '50px',
            border: '10px solid orange',
            minHeight: '100vh',
            fontSize: '24px',
            color: 'white'
        }}>
            <h1>🎉 TEST WRAPPER IS WORKING! 🎉</h1>
            <p>If you can see this, the component system is working!</p>
            <div style={{ backgroundColor: 'yellow', color: 'black', padding: '20px', margin: '20px 0' }}>
                {children}
            </div>
            <h2>🎯 FOOTER TEST 🎯</h2>
        </div>
    );
}
