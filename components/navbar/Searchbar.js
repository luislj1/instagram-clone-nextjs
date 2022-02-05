import { SearchIcon } from '@heroicons/react/outline'

export default function Searchbar(){
    return (
        <div className='hidden sm:flex 
        bg-[#EFEFEF] items-center gap-3 px-4 py-1.5 rounded-md'>
            <SearchIcon className='text-[#8E8E8E] w-4 h-4'/>
            <input type='search' placeholder='Search' 
            className='focus:outline-none placeholder-[#8E8E8E] bg-transparent'/>
        </div>
    )
}