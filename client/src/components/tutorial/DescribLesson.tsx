'use client'

import React, {useEffect, useState} from 'react'
import PythonCodeDisplay from './ShowCode'
import { getSubjectDetail } from '@/lib/api'
import Loading from '../common/loading'
import { Subject } from '@/types'

export default function DescribLesson({params}: any) {

  const [subjectDetail, setSubjectDetail] = useState(null)

  useEffect(() => {

    const fetchData = async() => {
      try{
        const response = await getSubjectDetail(params)
        setSubjectDetail(response)
        
      }catch{
        return
      }
    }
    fetchData()

  }, [])
    

    
    
  return (
    <>
    <div>

    </div>
   {subjectDetail ?
    <>
    <div className=' h-full p-4 overflow-scroll text-xs bg-secondary
                    dark:bg-card'>
         

   
         <div className='my-3 text-primary'>
           
           <h1 className=' font-bold'> {subjectDetail[0].title}</h1>
           <br/>
           <h4 className='text-red-600'>{subjectDetail[0].description}</h4>
            </div>




     {subjectDetail[0].lessons.map((lesson: any) => (
        
    
            <div className='border-b-2 my-2' key={lesson.id}>
                <h2 className=' my-2 p-2 text-primary'> {lesson.title} </h2>

               
                    {lesson.describe.split(".").map((sentence :string)=> 
                       <p className='my-2 ' key={sentence}>
                                {sentence.trim()} </p>)}
           


                
                <div className='my-7'>
                    <PythonCodeDisplay code={lesson.code}/>
                </div>


                
          

            </div>
))}
              
        </div>

       </> : <> <Loading/></>}

</>

  )
}