'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/src/ui/login-register/registerform';
import RegisterForm from '@/src/ui/login-register/registerform';

export default function RegisterPage() {
  return (
    <main className={"flex min-h-screen items-center justify-center bg-[#f0f2f5]"}>
      <RegisterForm />
    </main>
  )
}