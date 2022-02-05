import Head from 'next/head'

import NewPost from '../components/NewPost'

export default function Home() {
  return (
    <div className='flex flex-col bg-[#FAFAFA] h-full'>
      <Head>
        <title>Instagram Clone</title>
      </Head>

      <NewPost/>
    </div>



  )
  
}