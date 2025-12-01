'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/src/ui/login-register/loginform';
import dbConnect from '@/src/lib/dbConnect';

export default function LoginPage() {

  
  return (
    <main className={"flex min-h-screen items-center justify-center bg-[#f0f2f5]"}>
      <LoginForm />
    </main>
  )
}