"use client"

import { Disclosure } from "@headlessui/react"
import { QuestionsAndAnswer } from "./QuestionNanswers"

export default function QuestionSection() {
  
  return (
    <div className="w-full mt-4 mx-auto">
        <div className="my-2 font-bold opacity-50 flex justify-center animate-bounce " id="questions"><p className="text-center text-3xl">?</p></div>
        <div className="flex flex-col w-full ">
        {QuestionsAndAnswer.map(q=>[
            <Disclosure key={q.id} className="bg-darkColor2/50 p-2 rounded-md w-full sm:w-[50%] mx-auto " as="div">
              <Disclosure.Button className=' w-full text-center text-sm sm:text-base p-2 font-bold bg-green-600 text-slate-100 rounded-md'>
                    {q.question}
                </Disclosure.Button>
                <Disclosure.Panel  className=" p-2 bg-green-500/30 mt-1 rounded-md ">
                    {q.answer}
                </Disclosure.Panel>
            </Disclosure>
        ])}
              </div>
    </div>
  )
}
