'use client';
import React, { useEffect, useState } from 'react'
import { getSubjects } from '@/lib/api';
import { Button } from "@/components/ui/button"


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"


type subject ={
  id: number,
  title: string
  description: string
}

type Props = {
  subjects: subject[]
}


export function ListTutorial()  {
  const [subjects, setSubjects] = useState([])


  useEffect(() => {
    const fetchsubject = async () => {
  
        const subjectData = await getSubjects();
          console.log(subjectData)
        if (subjectData) {
          setSubjects(subjectData);
            // router.push('/login');
        } else {
          
            console.log(subjects)
        }
    };
    fetchsubject();
}, []);



  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="outline" size='sm'> لیست آموزش </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className=" text-center text-rose-600"> لیست آموزش </SheetTitle>
          </SheetHeader>
          <SheetDescription >
         
          </SheetDescription>
      

      <SheetFooter className=' overflow-scroll my-4' >
         <ul className=" h-screen overflow-scroll w-full" >

            {subjects.map((item) => (
              
                <li className='p-2 border hover:bg-primary 
                                hover:text-background 
                                transition-all text-center ' key={item.id}>

                  <Link href={`/tutorial/${item.id}`} > 
                    {item.title}
                  </Link>
                </li>
             
            ))}

          </ul>
        
        
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}