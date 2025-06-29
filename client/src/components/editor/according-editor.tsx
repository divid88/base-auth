import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import Editor from "@/components/editor/Editor";
  
import React from 'react'

export default function AccordingEditor() {
  return (
    <Accordion type="single" collapsible  className=' sticky w-[97%] mx-auto bottom-20 p-1 '>
        <AccordionItem value="item">
    <AccordionTrigger dir="rtl" className="bg-primary  rounded-lg px-7 py-1
     text-foreground font-bold"> کد ادیتور </AccordionTrigger>
    <AccordionContent>
      <Editor/>
    </AccordionContent>
  </AccordionItem>
</Accordion>
  )
}

