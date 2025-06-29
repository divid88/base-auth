'use client';

import Input from '@/components/ui/input'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { AciveCodeSchema, TAciveCodeSchema } from '@/schema/activecodeSchema';
import { useForm } from "react-hook-form";
import { activateUser } from '@/lib/auth';
import toast from 'react-hot-toast';
import { useEmailStore } from "@/store/user-register"
import { Button } from '@/components/ui/button';
import { FormFieldComponent } from '@/components/forms/BaseFormComponent';
import { useRouter } from 'next/navigation';


export default function InputOTPPattern() {
  const router = useRouter()
  const {email} = useEmailStore()

  const {register, handleSubmit, formState: {errors}} = useForm<TAciveCodeSchema>({
    resolver: zodResolver(AciveCodeSchema)
})

const onSubmit = async (values:z.infer<typeof AciveCodeSchema>) => {
  console.log(values)  
  try {
      const res = await activateUser(values);
      
      toast.success('Logged in')
      router.push('/dashboard')
      }
     catch (err) {
      toast.error('Invalid credentials')
      
    }

  }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
   
        <FormFieldComponent
					label=" کد فعال سازی"
					name="otp"
          
					register={register}
					errors={errors}
				
					
				/>
        <Input
        className='hidden'
          value={email}
        {...register("email")}
        />
        <div className='my-5'>

          <Button className='w-full' type='submit'> فرستادن کد </Button>

        </div>
      </form>
      {email}
    </div>
  )
}
