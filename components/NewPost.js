import { XIcon, EmojiHappyIcon } from "@heroicons/react/outline"

import { useRef, useState } from "react"
import { useSession } from "next-auth/react"

import { getDownloadURL, ref, uploadString } from "@firebase/storage"

import { db, storage } from "../firebase"
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore"

import { useRouter } from "next/router";

export default function NewPost(){
    const { data: session } = useSession()

    const router = useRouter()

    const filePickerRef = useRef(null)
    const closeButtonRef = useRef(null)

    const [loading, setLoading] = useState(false)

    const [postPicture, setPostPicture] = useState(null)
    const [postVideo, setPostVideo] = useState(null)
    const [postCaption, setPostCaption] = useState("")

    async function uploadPost(e){
        e.preventDefault()

        setLoading(true)

        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            username: session.user.name,
            userImg: session.user.image,
            text: postCaption,
            timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        const videoRef = ref(storage, `posts/${docRef.id}/video`)

        if (postPicture) {
          await uploadString(imageRef, postPicture, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "posts", docRef.id), {
              image: downloadURL,
            })
          })
        }

        if (postVideo) {
            await uploadString(videoRef, postVideo, "data_url").then(async () => {
              const downloadURL = await getDownloadURL(videoRef);
              await updateDoc(doc(db, "posts", docRef.id), {
                video: downloadURL,
              })
            })
        }

        setPostVideo(null)
        setPostPicture(null)
        setPostCaption("")
        router.push('/')
    }

    function uploadPostFile(e){

        const reader = new FileReader()
        const extension = e.target.files[0].name.split('.').pop().toLowerCase()

        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0])
        }
        
        reader.onload = (readerEvent) => {
            if(extension == 'mp4' || extension == 'mpg' || extension == 'mpeg'){
                setPostVideo(readerEvent.target.result)
                return
            }
            setPostPicture(readerEvent.target.result)
        }
    }

    return (
        <div className='fixed flex justify-center items-center w-full h-screen inset-0 bg-black bg-opacity-90 z-10'>
                { postPicture || postVideo ? (
                <div className='flex flex-col bg-white w-[750px] h-[500px] rounded-md'>
                    <div className='flex justify-center items-center border-b border-[#E2E2E2] py-2 w-full relative'>
                        <button onClick={() => router.push('/')} ref={closeButtonRef} disabled={loading} hidden></button>
                        <XIcon className={`w-6 h-6 absolute left-2 ${loading ? '' : 'cursor-pointer'}`} onClick={() => closeButtonRef.current.click()}/> 
                        <span className='font-semibold'>Create new post</span>
                        <button onClick={uploadPost} disabled={loading}
                        className={`text-[#0999F6] text-sm font-semibold absolute right-2 ${loading ? 'opacity-50' : ''}`}>Share</button>
                    </div>
                    <div className='flex h-full w-full'>
                        <div className='w-[400px] h-[459px] border-r border-[#E2E2E2]'>
                            { postPicture && <img
                            className={`w-full h-full object-cover rounded-md ${loading ? 'opacity-50' : ''}`} 
                            src={postPicture}
                            />}
                            { postVideo && <video controls muted loop autoPlay
                            className={`w-full h-full object-cover rounded-md ${loading ? 'opacity-50' : ''}`} 
                            src={postVideo}
                            />}
                        </div>
                        
                        <div className='flex flex-col flex-grow p-4 gap-2'>
                            <div className='flex gap-2'>
                                <img 
                                    src={session.user.image}
                                    className='w-7 h-7 object-cover rounded-full'
                                />
                                <span className='font-semibold'>{session.user.name}</span>
                            </div>
                            <textarea placeholder='Write a caption...' 
                            rows='8'
                            spellCheck='false'
                            className={`bg-transparent resize-none focus:outline-none ${loading ? 'text-gray-400' : ''}`}
                            disabled={loading}
                            value={postCaption} onChange={(e) => setPostCaption(e.target.value)}></textarea>

                            <EmojiHappyIcon className='w-6 h-6 text-gray-400'/>
                        </div>
                    </div>
                </div>
                ) : (
                <div className='flex flex-col items-center bg-white w-[500px] h-[500px] rounded-md'>
                    <div className='flex justify-center items-center border-b border-[#E2E2E2] py-2 w-full relative'>
                        <XIcon className='w-6 h-6 absolute left-2 cursor-pointer' onClick={() => router.push('/')}/>     
                        <span className='font-semibold'>Create new post</span>
                    </div>
                    <div className='flex flex-col h-full justify-center items-center gap-4 w-[800px]'>
                        <span className='text-xl font-light'>Drag photos and videos here</span>
                        <button className='text-white bg-[#0095F6] text-sm font-semibold px-2 py-1.5 rounded-md' onClick={() => filePickerRef.current.click()}>Select from computer</button>
                        <input type='file' hidden accept='.jpg, .jpeg, .png, .mp4, .mpg, .mpeg'
                         ref={filePickerRef} onChange={uploadPostFile}/>
                    </div>
                </div>
                ) }
        </div>
    )
}