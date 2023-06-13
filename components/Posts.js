import React, { useEffect, useState } from 'react'
import Post from './Post'
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import {db,storage} from '../firebase'

import { collection, onSnapshot, orderBy, snapshotEqual,query } from 'firebase/firestore'
// const posts=[
//     {
//         id:'123',
//         username:'sserwrt',
//         userImg:"https://links.papareact.com/3ke",
//         img:"https://links.papareact.com/3ke",
//         caption:"subsrcibe and add",

//     },
//     {
//         id:'123',
//         username:'sserwrt',
//         userImg:"https://links.papareact.com/3ke",
//         img:"https://links.papareact.com/3ke",
//         caption:"subsrcibe and add",

//     },
// ]
const Posts = () => {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
      return onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot=>{
        setPosts(snapshot.docs);
      });
      

    },[db]);
    console.log(posts)
  return (
    <>{
        posts.map((post)=>(
            <Post key={post.id} id={post.id} username={post.data().username} img={post.data().image} userImg={post.data().profileImg} caption={post.data().caption}/>
        ))
    }
   
    
    </>
  )
}

export default Posts