import React from 'react'
import { faker } from "@faker-js/faker";
import { useEffect,useState } from 'react';
const Suggestions = () => {
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
        const newProfile=profile(6)
  
      setSuggestion(newProfile);
  
    },[]);
  return (
    <div className='mt-4 ml-10'>
        <div className="flex justify-between text-sm mb-5">
            <h3 className='text-sm font-bold text-gray-400' >Suggestions for you</h3>
            <button className='text-gray-400 font-semibold'>See All</button>

        </div>
        
        {
            suggestion.map((profile)=>(
               <div className="flex items-center justify-between mt-3" key={profile.id}>
                    <img src={profile.avatar} alt="" srcset=""  className='w-10 h-10 rounded-full border p-[2px]'/>
               
               <div className="flex-1 ml-4">
                 <h2 className='font-semibold text-sm'>{profile.username}</h2>
                 <h3 className='text-xs text-gray-400 truncate'>Works at {profile.email}</h3>
               </div>
               <button className='text-blue-400'>Follow</button>
               </div> 
            ))
        }
    </div>
  )
}

export default Suggestions