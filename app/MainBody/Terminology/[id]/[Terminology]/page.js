"use client"

import { collection,getDocs,query,where,doc,updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useQuery } from "react-query"
import { useMemo, useState,useEffect, useContext,useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { AuthContext } from "@/app/ContextAPI/auth-context"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";


async function DocQuery(id){
  return await getDocs(query(collection(db,"Motion Graphics Term"),where("id", "==", id)))
}

export default function UpdateTerminology({params: params}) {
  const[Term, setTerm] = useState('')
  const[Explan, setExplan] = useState('')
  const[Visual, setVisual] = useState('')
  const {user} = useContext(AuthContext)
  
  const TermId = params.Terminology
  const id = params.id
  const AdminID = process.env.NEXT_PUBLIC_ADMIN_ID
  const UpdataRecord = doc(db, "Motion Graphics Term",TermId);

  const defaultTerms = {
    Terminology:Term,
    Explanation:Explan
  }

  useEffect(()=>{
    const effectData = async()=>{
      const data = await DocQuery(id)
      const TermData = data?.docs.map((d)=>{
        return{
          ...d.data()
        }
      })
      return TermData?.map(x=>{
      setTerm(x.Terminology),
      setExplan(x.Explanation)
    })}
    
    effectData()
   },[])

  const {register,formState, control, handleSubmit } = useForm({
    defaultValues: defaultTerms
  })

  const handleUpdate = async (e)=>{
    e.preventDefault();
    await updateDoc(UpdataRecord,{
      Explanation: Explan,
      Terminology: Term
    })
    setExplan('')
    setTerm("")
  }

  const formSubmit= (data)=>{
    return console.log(data);
  }

  const {data,isSuccess} = useQuery(["TermUpdate",id],()=>DocQuery(id),{
    refetchOnMount:false,
    refetchOnWindowFocus:false
  })

  const TermData = data?.docs.map((d)=>{
    return{
      ...d.data()
    }
  })

  

   if(user === null && user?.uid !== AdminID ){
    redirect('/MainBody/Terminology/'+id )
  }

  return (
    <div>
      <h2>{TermData?.map(x=><h1>{x.Terminology}</h1>)}</h2>
      <form className="flex flex-col gap-3" onSubmit={handleUpdate} >
      <input  value={Term} type={"text"} onChange={(e)=>setTerm(e.target.value)} className="input" placeholder="Terminology" />
      <textarea  value={Explan} onChange={(e)=>setExplan(e.target.value)} cols={6} rows={6} className="input" placeholder="Explanation" />
      <input  type={"text"}  className="input" placeholder="Visual"/>
      <button type={"submit"} className="btnform">Updates</button>
    </form>
    <DevTool control={control} />
    </div>
  )
}
