'use client';
import Login from "@/components/forms/login-user";
import RegisterUser from "@/components/forms/register-user";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {


  return (
    
  <div >
  <div className="flex w-full max-w-sm flex-col gap-6"> 
   <Tabs defaultValue="login" className="w-[400px]" dir="rtl">
      <TabsList>
        <TabsTrigger value="register"> ثبت نام</TabsTrigger>
        <TabsTrigger value="login">ورود</TabsTrigger>
      </TabsList>
     
      <Login/>
      <RegisterUser/>
      
    </Tabs> 
  </div>
    </div>
  );
}
