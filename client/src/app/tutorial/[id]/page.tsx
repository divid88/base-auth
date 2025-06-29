'use client'

import AccordingEditor from "@/components/editor/according-editor";
import DescribLesson from "@/components/tutorial/DescribLesson";
import { ListTutorial } from "@/components/tutorial/list-tutorials";
import { Button } from "@/components/ui/button";
import { getSubjects} from "@/lib/api";
import Link from "next/link";
  
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

interface Params{
  id: string
}

export default function TutorialDetial({params}: { params: Promise<Params> }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const resolvedParams = use(params); // Unwrap the Promise
  const id = resolvedParams.id; // Safely access the property

  useEffect(() => {
      const fetchUser = async () => {
    
          const userData = await getSubjects();

          if (userData) {
            setUser(userData);
              // router.push('/login');
          } else {
            
              console.log(user)
          }
      };
      fetchUser();
  }, [router]);

  console.log(user)

  return (
    <main className="min-h-screen bg-background p-4">
         <div className=' relative'>
    <div className='  grid md:grid-cols-12 '>
        
        <div className=' relative' >
        {/* list tutorial */}

            
      {user && <ListTutorial subjects={user}/>}

        </div>
        {/* describe tutorial */}
        <div className=' col-span-12 md:m-4 h-[550px] overflow-scroll border 
                          rounded-lg '>
          <DescribLesson params={id}/>
          
        </div>
    </div>
     
     <AccordingEditor/>
      </div>

      <div className=' fixed bottom-0 right-0 p-4'>
      <Link href={`/tutorial/code/${id}`}>
        <Button className='bg-orange-500 text-white rounded-lg hover:bg-orange-700'>
          تمرینات این بخش
        </Button>
      </Link>
    </div>

    </main>
  );
}