"use client"

import { createContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { cache, useMemo, use, useState } from "react";

export const singleTerminologyContext = createContext({
    Terminology: [],
    singleTerminologyRequest: async()=>{}
})


export default function TerminologySingleContext({children}) {
    const [Terminology, setVal] = useState({})

    const singleTerminologyRequest = cache( async(termid)=>{
        return await getDocs(query(collection(db, "Motion Graphics Term",termid)))})

        const docData = use(singleTerminologyRequest())
        console.log(docData);
        const dataa = docData.docs.map((doc)=>{
            return{
                id: doc.id,
            ...doc.data()
            }})
    const MemoData = useMemo(()=>{
        setVal(dataa)
    },[])
    console.log(Terminology);

    const values = {Terminology, singleTerminologyRequest}

  return <singleTerminologyContext.Provider value={values}>
        {children}
    </singleTerminologyContext.Provider>
}
