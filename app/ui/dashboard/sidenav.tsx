import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import RiddleLogo from '../riddle-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import User from '@/lib/models/User';


// interface SideNavProps {
//   email: String
// }

export default function SideNav({email}: {email: String}) {


    const displayName = email ? email : "User";
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-20"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <RiddleLogo />
        </div>
      </Link> */}
      
      <h1 className='text-2xl tracking-tight text-white'> {displayName}'s Dashboard</h1>


      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2 text-white">
        <NavLinks />
      </div>

      <form className ="mt-auto">
        <button className="flex h-[48px] w-full mt-auto items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 text-white">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
      
    </div>
  );
}
