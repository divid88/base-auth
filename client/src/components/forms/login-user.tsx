'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter } from "next/navigation"
import { login } from '@/lib/auth';
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { loginUserSchema, TLoginUserSchema } from "@/schema/login-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { FormFieldComponent } from "@/components/forms/BaseFormComponent"
import { MailIcon } from "lucide-react"
import { TabsContent } from "../ui/tabs";



export default function Login() {

    const router = useRouter();
    const pathname = useSearchParams();  

    const {register, handleSubmit, formState: {errors}} = useForm<TLoginUserSchema>({
        resolver: zodResolver(loginUserSchema)
    })

    const onSubmit = async (values:z.infer<typeof loginUserSchema>) => {
      console.log(values)  
      try {
            await login(values);
          
          toast.success('Logged in')
          const path = pathname.get('callback')
         
            router.push('/dashboard');
         
          
        } catch (err) {

          toast.error('Invalid credentials')
          
        }

      }
    
   
  return (
    <TabsContent value="login">
    <Card dir='rtl'>
    <CardHeader>
      <CardTitle>  ورود </CardTitle>
      <CardDescription>
        
      </CardDescription>
    </CardHeader>
    <form  onSubmit={handleSubmit(onSubmit)}>
    <CardContent className="space-y-2">
      
        <div className="space-y-1">

          <FormFieldComponent
					label=" ایمیل "
					name="email"
					register={register}
					errors={errors}
					placeholder="ایمیل"
					startIcon={<MailIcon className="dark:text-babyPowder size-8" />}
				/>

        </div>
        <div className="space-y-1">
        <FormFieldComponent
					label=" پسورد "
					name="password"
					register={register}
					errors={errors}
					placeholder="پسورد"
					isPassword={true}
					link={{ linkText: "رمز عبور را فراموش کرده اید؟", linkUrl: "/accounts/changepassword" }}
				/>
        </div>
        
      
    </CardContent>
    <CardFooter>
      <Button type='submit' className="pb-3"> ورود </Button>
    </CardFooter>
    </form>
  </Card>
</TabsContent>

  )
}