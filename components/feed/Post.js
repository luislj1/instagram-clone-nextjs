import { HeartIcon, AnnotationIcon, PaperAirplaneIcon, DotsHorizontalIcon, EmojiHappyIcon, TrashIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { useState, useEffect } from "react"

import {
    query,
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
    serverTimestamp,
} from "@firebase/firestore"

import { db } from "../../firebase"

import { useSession } from "next-auth/react"

import Moment from "react-moment"

export default function Post({ id, post }){
    const { data: session } = useSession();

    const [loading, setLoading] = useState(false)

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])

    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState([])

    useEffect(
        () =>
          onSnapshot(query(collection(db, "posts", id, "comments")), (snapshot) => 
            setComments(snapshot.docs)
          ),
        [db, id]
    )

    useEffect(
        () =>
          onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
            setLikes(snapshot.docs)
          ),
        [db, id]
    )

    useEffect(
        () =>
          setLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
          ),
        [likes]
    )

    const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
            })
        }
    }

    const commentPost = async (e) => {
        e.preventDefault()
    
        setLoading(true)

        await addDoc(collection(db, "posts", id, "comments"), {
          comment: comment,
          username: session.user.name,
          timestamp: serverTimestamp(),
        })
    
        setComment('')
        setLoading(false)
      }

    return (
        <div className='sm:w-[600px] w-full
        bg-white border border-[#E2E2E2]'>
            <div className='flex items-center p-4'>
                <div className='flex items-center gap-2 w-full'>
                    <img 
                    src={post.userImg}
                    className='w-10 h-10 rounded-full object-cover'
                    />
                    <span className='text-sm font-semibold'>{post.username}</span>
                </div>
                <div className='flex justify-end w-full'>
                    <DotsHorizontalIcon className='w-5 h-5'/>
                </div>
            </div>
            { post.image && <img 
            src={post.image}
            className='object-cover'
            />}
            { post.video && <video muted controls loop autoPlay
            src={post.video}
            className='object-cover'
            />}
            <div className='flex flex-col p-4'>
                <div className='flex items-center gap-2'>
                    {liked ? <HeartIconFilled className='w-7 h-7 text-[#ED4956] cursor-pointer' onClick={likePost} /> : <HeartIcon className='w-7 h-7 cursor-pointer' onClick={likePost} /> }
                    <AnnotationIcon className='w-7 h-7'/>
                    <PaperAirplaneIcon className='w-7 h-7'/>
                    {session.user.uid === post?.id && <TrashIcon className='w-7 h-7 cursor-pointer' onClick={() => deleteDoc(doc(db, 'posts', id))}/>}
                </div>
                <span className='text-sm font-semibold'>{likes.length} likes</span>
                <span className={`text-sm ${post.text.indexOf(' ') >= 0 ? 'break-words' : 'break-all'}`}> <span className='font-semibold'>{post.username} </span>{post.text}</span>
                { comments.length > 0 && <span className='text-sm text-gray-500'>View all {comments.length} comments</span>}
                <Moment fromNow className='text-xs text-[#BCBCBC]'>{post?.timestamp?.toDate()}</Moment>
            </div>
            <div className='flex p-4 border-t border-[#E2E2E2] gap-4'>
                <EmojiHappyIcon className='w-8 h-8'/>
                <input type='text' placeholder='Add a comment...' 
                className='focus:outline-none placeholder-[#8E8E8E] bg-transparent text-sm w-full'
                value={comment}
                onChange={(e) => setComment(e.target.value)}/>
                <button className={`text-sm font-semibold ${!comment ? 'text-[#B6E2FF]' : 'text-[#0999F6]'}`}
                disabled={!comment || loading} onClick={commentPost}>Post</button>
            </div>
        </div>
    )
}
