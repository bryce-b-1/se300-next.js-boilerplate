import { PowerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SignOutButton(){


    return(
        <form className ="mt-auto">
            <Link  href="/logout" className="flex h-[48px] w-full mt-auto items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 text-white">
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
            </Link>
      </form>
    )
}