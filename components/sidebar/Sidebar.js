import { useSession } from "next-auth/react"

import FakeUser from './FakeUser'

export default function Sidebar(){
    const { data: session } = useSession()

    return (
        <div className='hidden lg:flex flex-col mt-28 w-[300px] gap-4 fixed ml-[950px] z-5'>
            <div className='flex items-center gap-4'>
                <img className='w-12 h-12 rounded-full object-cover'
                src={session.user.image}></img>
                <span className='text-sm font-semibold'>{session.user.name}</span>
                <button className='text-xs font-semibold absolute right-0'>See All</button> 
            </div>
            <span className='text-sm text-gray-500 font-semibold'>Suggestions for you</span>
            <div className='flex flex-col gap-2'>
                <FakeUser name='Elon Musk' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSXkT-CR8LDhgmNXxJUqR4jvK5mQgYOynVJuRmArtI7bJQ1HDBfKttjQ9FhJblAF83us&usqp=CAU'/>
                <FakeUser name='Steve Jobs' image='https://www.eluniverso.com/resizer/ybP0yINx6S5xtqCGzvnCqGw0fnY=/1005x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/6VY6ANJGFVD6RERENITNV26WHE.jpg'/>
                <FakeUser name='Bill Gates' image='https://phantom-marca.unidadeditorial.es/8002e0f7e4214094faad112b786c3152/resize/1320/f/jpg/assets/multimedia/imagenes/2021/05/18/16213679454840.png'/>
                <FakeUser name='Warren Buffet' image='https://media.revistagq.com/photos/5f0d755342f91a64e569069e/1:1/w_2000,h_2000,c_limit/warren-buffett.jpg'/>
                <FakeUser name='Sundar Pichai' image='https://emprendedoresnews.com/wp-content/uploads/2021/04/getty_512026414_384088-883x666.jpg'/>
            </div>
        </div>
    )
}