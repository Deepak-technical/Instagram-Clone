import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from './Story'
import { useSession } from "next-auth/react";
const Stories = () => {
  const{data:session}=useSession();
  const [suggestion, setSuggestion] = useState([]);
  useEffect(() => {
    function randomProfile() {
        return {
          id: faker.datatype.uuid(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar(),
          password: faker.internet.password(),
          birthdate: faker.date.birthdate(),
          registeredAt: faker.date.past(),
        };
      }
      //define a method to generate users up to 'max_size' amount
      const profile = function (max_size) {
        const users = [];
        for (let index = 0; index < max_size; index++) {
          users.push(randomProfile());
        }
        return users;
      };
      const newProfile=profile(30)

    setSuggestion(newProfile);

  },[]);
  return <>
         <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
         {session && (
          <Story username={session.user.username} img={session.user.image}/>
         )}
       {suggestion.map(profile=>(
        // {console.log(`eAach profile`,profile.avatar)}
        
        //    <img src={profile.avatar}/
        <Story key={profile.id} img={profile.avatar} username={profile.username}/> 
            
        ))}
    </div>
    </>
};

export default Stories;
