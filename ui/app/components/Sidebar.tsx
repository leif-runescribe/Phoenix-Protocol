// components/Sidebar.tsx
import Link from 'next/link';
import { Home, Users, Info, LayoutDashboard, Landmark } from 'lucide-react';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  return (
    <div className="md:w-96 w-48  bg-gradient-to-r from-amber-700 p-5">
         <Link href="/">
          <div className="text-xl flex flex-row gap-2 font-medium text-white cursor-pointer">
            <span className="text-green-400">
              <Image src="/a.png" alt="Pay Icon" width={80} height={40} />
            </span>
          </div>
        </Link>
      <ul className='text-center ml-16 mt-20 md:ml-0 space-y-20 items-center'>
        <li className="mb-4">
          <Link href="/" className="text-white flex items-center hover:text-amber-400">
            <LayoutDashboard size={40}  className="mr-3" /> <div className='hidden md:flex'>Dashboard</div>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/" className="text-white flex items-center hover:text-amber-400">
            <Landmark size={40} className="mr-3" /> <div className='hidden md:flex'>Dashboard</div>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/" className="text-white flex items-center hover:text-amber-400">
            <Info size={40} className="mr-3" /> <div className='hidden md:flex'>Dashboard</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
