"use client"

import { collection,getDocs,query,where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useQuery } from "react-query"
import { useMemo, useState,useEffect, cache } from "react"
import { v4 as uuidv4 } from "uuid"

async function DocQuery(TermId){
  return await getDocs(query(collection(db,"Motion Graphics Term"),where("Terminology", "==" , TermId)))
}

export default function UpdateTerminology({params: params}) {
  const[Term, setTerm] = useState([])
  const[Explan, setExplan] = useState('')
  const[Visual, setVisual] = useState('')

  const TermId = params.Terminology
  const {data} = useQuery(["TermUpdate",TermId],()=>DocQuery(TermId),{
    refetchOnMount:false,
    refetchOnWindowFocus:false
  })

  const TermData = useMemo(()=>data?.docs.map((d)=>{
    return{
      ...d.data()
    }
  }),[data])


  return (
    <div>
      <h2>{TermId}</h2>
      <form className="flex flex-col gap-3" >
      <input  type={"text"} className="input" placeholder="Terminology" />
      <textarea   name="definition" cols={6} rows={6} className="input" placeholder="Explanation" />
      <input  type={"text"}  className="input" placeholder="Visual"/>
      <button type={"submit"} className="btnform">Create</button>
    </form>
    </div>
  )
}
