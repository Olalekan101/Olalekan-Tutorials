"use client"

import { createContext, useState, useEffect } from "react"

const readMotion = {
    read: []
}

const handleCheck = ()=>{
        if( typeof window !== 'undefined'){
            const check = localStorage?.getItem("read");
            return check ? JSON.parse(check) : readMotion;
        }
}

export const ReadTerms = createContext({
    readFunction: ()=>{},
    removeFunction: ()=>{},
})

export default function CheckBoxContext({children}) {
    const [read, setRead] = useState(handleCheck)

    useEffect(()=>{
        localStorage.setItem("read",JSON.stringify(read))
    },[read])

    const readFunction =(motionterms)=>{
        setRead((prev)=>({
            ...prev,
            read:[...prev.read, motionterms]
        }))
    }

    const removeFunction = ()=>{
        localStorage.removeItem('read')
    }
     
    const values = {...read,readFunction,removeFunction}
  return <ReadTerms.Provider value={values}>
        {children}
  </ReadTerms.Provider>
}
