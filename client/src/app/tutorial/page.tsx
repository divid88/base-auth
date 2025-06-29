
'use client'

import React, { useEffect, useState } from 'react'
import { get_user_progress} from "@/lib/api";
import Loading from '@/components/common/loading';
import Link from 'next/link';
import { ListTutorial } from '@/components/tutorial/list-tutorials';


export default function Tutorial() {

  const [subject, setsubject] = useState(null);


  useEffect(() => {
      const fetchsubject = async () => {
    
          const subjectData = await get_user_progress();
            console.log(subjectData)
          if (subjectData) {
            setsubject(subjectData);
              // router.push('/login');
          } else {
            
              console.log(subject)
          }
      };
      fetchsubject();
  }, []);


  return (
    <div className="container mx-auto h-[750px] md:h-[450px] md:w-[70%] 
                    md:bg-contain bg-contain 
                    bg-center md:grid md:grid-cols-1 mt-7">
       
        <div className=" mt-2 border shadow-md animate-zoom-in md:mt-2 bg-secondary
                    shadow-secondary p-5 mx-3 rounded-lg text-center py-5">
          <ListTutorial/>
        <div className=" flex flex-col items-center justify-center gap-1 ">
          <h1 className="font-black text-lg mt-2 md:my-1 text-center tracking-tighter ">
              لیست آموزش
          </h1>

            <div className='flex justify-center my-2 md:my-3 w-[80%]'>
            
              { subject ? 
              <ul className='w-full'>
                {subject.map((item: any) => (
              
              <li className='p-2 border hover:bg-primary w-full
                              hover:text-background 
                              transition-all text-center ' key={item.id}>
                  <Link href={`/tutorial/${item.subject.id}`}>                
                    {item.subject.title}
                  </Link>
              </li>
          
          ))}   
           </ul>
                
                    : 
                  <Loading/>
              }
            
            </div>
        </div>

      </div>
    </div>
  )
}
