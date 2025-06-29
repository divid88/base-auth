import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import  InputOTPPattern  from "./active-code"
import React from "react"


export function DialogDemo({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        < DialogTrigger onClick={() => setOpen(!open)}></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <InputOTPPattern/>
        </div>
   
      </DialogContent>
    </Dialog>
  )
}
