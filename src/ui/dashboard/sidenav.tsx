import Link from 'next/link';
import NavLinks from './nav-links';
import RiddleLogo from '../riddle-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import SignOutButton from './signout-button';


// interface SideNavProps {
//   email: String
// }

export default function SideNav({firstName}: {firstName: string}) {


    const displayName = firstName ? firstName : "User";
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

      <SignOutButton />

      
    </div>
  );
}
