'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../ui/login-register/loginform';

export default function LoginPage() {
  return (
    <main className={"flex min-h-screen items-center justify-center bg-[#f0f2f5]"}>
      <LoginForm />
    </main>
  )
}