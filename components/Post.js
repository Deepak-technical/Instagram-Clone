import React, { useEffect, useState } from "react";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
// import Moment from "moment";
import Moment from "react-moment";

import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
// import { HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import { useSession } from "next-auth/react";
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  snapshotEqual,
} from "firebase/firestore";
import { db, storage } from "../firebase";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts", id, "comments"),orderBy('timestamp','desc')),
      (snapshot) => {
        setComments(snapshot.docs);
        console.log("the data ", snapshot.docs);
      }
    );
  }, [db, id]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts", id, "likes")),
      (snapshot) => {
        setLikes(snapshot.docs);
        // console.log("the data ",snapshot.docs)
      }
    );
  }, [db, id]);

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };


  console.log("haslike value",hasLiked)
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  console.log("dtata comments", comments);

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          src={userImg}
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <HeartIconFilled className="h-5" />
      </div>
      <img src={img} className="object-cover  w-full" alt="" />
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled onClick={likePost} className="btn text-red-500"/>
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            {/* <HeartIcon onClick={likePost} className="btn" /> */}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      <p className="p-5 truncate">
        {likes.length>0 && <p className="font-bold mb-1">{likes.length} likes
          </p>}
      </p>

      <div className="">
        <p className="p-5 truncate">
          <span className="font-bold mr-1">{username}</span>
          {caption}
        </p>
        {comments.length > 0 && (
          <div className="h-20  overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
            {comments.map((comment) => (
              <div
                className=" flex items-center my-4 flex-row ml-4 md:ml-10 h-10 "
                key={comment.id}
              >
                <img
                  src={comment.data().userImage}
                  className="h-7 rounded-full mr-4"
                  alt=""
                />
                <p className="text-sm flex-1">
                  <span className="font-bold">{comment.data().username}</span>
                  {"  "}
                  {comment.data().comment}
                </p>
                <Moment fromNow className="pr-5 text-xs">
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}
        {session && (
          <form className="flex items-center p-4 ">
            <EmojiHappyIcon className="h-7" />
            <input
              type="text"
              className="border-none flex-1 focus:ring-0 "
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              onClick={sendComment}
              className="font-semibold  text-blue-400"
            >
              Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Post;
