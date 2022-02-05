import Image from 'next/image'
import Searchbar from './Searchbar'
import NavbarIcon from './NavbarIcon'

import { useSession, signOut } from "next-auth/react"

import { HomeIcon } from '@heroicons/react/solid'
import { PlusCircleIcon, HeartIcon } from '@heroicons/react/outline'

import { useRouter } from "next/router";

export default function Navbar(){
    const { data: session } = useSession()

    const router = useRouter()
 
    return (
        <div className='w-full fixed flex justify-around items-center h-[55px] bg-white border-b border-[#E2E2E2]'>

            <Image
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
            width={103}
            height={29}
            />

            <Searchbar/>

            <div className='flex items-center gap-5'>
                <NavbarIcon Icon={HomeIcon}/>
                <div onClick={() => router.push('/post')} className='cursor-pointer'>
                    <NavbarIcon Icon={PlusCircleIcon} 

                    />
                </div>

                <NavbarIcon Icon={HeartIcon}/>
                <div>
                    <img 
                    src={session.user.image}
                    className='w-6 h-6 object-cover rounded-full cursor-pointer'
                    onClick={signOut}
                    />

                </div>
            </div>
        </div>
    )
}