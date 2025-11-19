'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {

    // need logic to check if the session actually existed
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        setError('');

        async function doLogout() {
            try{
                const res = await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                


                if(res.ok){
                    router.replace('/login');
                } 

            } catch (err) {
                setError('An error occurred. Please try again.');
            }
        }

        doLogout();

    }, [router]);

    



  return (
    <main className={"flex min-h-screen items-center justify-center bg-[#f0f2f5]"}>
      <p> logging you out...</p>
    </main>
  )
}