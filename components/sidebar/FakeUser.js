export default function FakeUser({name, image}){
    return (
        <div className='flex items-center'>
            <div className='flex gap-3'>   
                <img className='w-8 h-8 rounded-full object-cover'
                src={image} />
                <div className='flex flex-col'>
                    <span className='text-sm font-semibold'>{name}</span>
                    <span className='text-xs text-gray-400'>Follows you</span>
                </div>
            </div>
            <button className='text-xs text-[#0999F6] font-semibold absolute right-0'>Follow</button>        
        </div>
    )
}