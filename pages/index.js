import { useSession, signIn } from "next-auth/react"
import Head from 'next/head'

import Navbar from '../components/navbar/Navbar'
import Feed from '../components/feed/Feed'

export default function Home() {
  const { data: session } = useSession()

  if(session){
    return (
      <div className='flex flex-col bg-[#FAFAFA] h-full'>
        <Head>
          <title>Instagram Clone</title>
        </Head>

        <Navbar />
        <Feed />
      </div>
    )
  }

  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center bg-black">
        <button className="text-white font-bold text-2xl"
        onClick={() => signIn()}>Join Instagram Clone</button>
      </div>
    </>
  )
  
}
