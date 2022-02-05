import Post from './Post'

import { useState, useEffect } from 'react'

import { onSnapshot, collection, query, orderBy } from "@firebase/firestore"
import { db } from "../../firebase"

import Sidebar from '../sidebar/Sidebar'

export default function Feed(){
    const [posts, setPosts] = useState([])

    useEffect(
        () =>
          onSnapshot(
            query(collection(db, "posts"), orderBy("timestamp", "desc")),
            (snapshot) => {
              setPosts(snapshot.docs);
            }
          ), [db]
    );

    return(
        <div className='flex justify-center gap-2 lg:mr-80'>
            <div className='flex flex-col gap-6 mt-24 mb-8'>
            {posts.map((post) =>{
                return <Post key={post.id} id={post.id} post={post.data()}/> 
            })}
            </div>

            <Sidebar/>
        </div>
    )
}