'use client';
import { registerUserSchema, TRregisterUserSchema } from "@/schema/register-validation";
import { register as registerUserApi } from "@/lib/auth";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { FormFieldComponent } from "./BaseFormComponent";
import { useEmailStore } from "@/store/user-register";
import { toast } from "react-toastify";
import { MailIcon } from "lucide-react"
import { TabsContent } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { DialogDemo } from "./dialog-code-active";
import React from "react";


export default function RegisterUser() {
   const [open, setOpen] = React.useState(false)
    const { setEmail } = useEmailStore()
    
    const {register, handleSubmit, formState: {errors}} = useForm<TRregisterUserSchema>({
        resolver: zodResolver(registerUserSchema)
    });


    const onSubmit = async (values:z.infer<typeof registerUserSchema>) => {
     
      try {
          const res = await registerUserApi(values);
          
          toast.success('registered successfully please check your email')
          setEmail(res.email)
          setOpen(true)
          
          }
         catch (err) {
          toast.error(typeof err === "string" ? err : (err instanceof Error ? err.message : "An error occurred"))
          
        }

      }
    
  return (
     <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                <DialogDemo open={open} setOpen={setOpen}/>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
        <form  onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6">
              <div className="space-y-1">

          <FormFieldComponent
          label="ایمیل"
          name="email"
          register={register}
          errors={errors}
          placeholder="ایمیل"
          startIcon={<MailIcon className="dark:text-babyPowder size-8" />}
          />

          </div>
          <div className="space-y-1">
          <FormFieldComponent
          label="پسورد"
          name="password"
          register={register}
          errors={errors}
          placeholder="پسورد"
          isPassword={true}
         
          />
        </div>
        <div className="space-y-1">
          <FormFieldComponent
          label="تکرار پسورد"
          name="re_password"
          register={register}
          errors={errors}
          placeholder="تکرار پسورد"
          isPassword={true}
         
          />
        </div>
            </CardContent>
            <CardFooter>
              <Button> ثبت نام </Button>
            </CardFooter>
        </form>
          </Card>
        </TabsContent>
  )
}
