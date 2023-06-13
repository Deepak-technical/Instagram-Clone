import React from "react";
import Image from "next/image";

import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  HomeIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { useRouter } from "next/router";
const Header = () => {
  const router =useRouter();
  const { data: session } = useSession();
  const[open,setOpen]=useRecoilState(modalState)
  // console.log(`hii`,session)

  return (
    <div className="shadow-sm border-b bg-white sticky top-0">
      {/* <h1>I am Header</h1> */}
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        <div onClick={()=>router.push("/")} className="relative hidden lg:inline-grid h-14 w-28">
          <Image className="w-24 h-14" src="https://links.papareact.com/ocw" alt="none" fill="fill" />
        </div>
        <div className="relative  lg:hidden h-10 w-10 flex-shrink-0 cursor-pointer">
          <Image src="https://links.papareact.com/jjm" alt="none" fill="fill" />
        </div>

        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md "
              type="text"
              placeholder="Search"
              value=""
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <HomeIcon className="navBtn " />

          <MenuIcon className="h-10 w-10 md:hidden cursor-pointer" />
       {session?(
        <>
          <div className="relative navBtn">
            <PaperAirplaneIcon className="navBtn rotate-45" />
            <div className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse  ">
              
            </div>
          </div>
          <PlusCircleIcon onClick={()=>setOpen(true)} className="navBtn"/>
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          {/* // eslint-disable-next-line @next/next/no-img-element */}
          <img
            onClick={signOut}
            src={session?.user?.image}
            alt=""
            alt="profile"
            className="h-10 rounded-full cursor-pointer"
          />
       
       </>):(
        <button onClick={signIn}>SignIn</button>
       )}
        </div>
      </div>
    </div>
  );
};

export default Header;
