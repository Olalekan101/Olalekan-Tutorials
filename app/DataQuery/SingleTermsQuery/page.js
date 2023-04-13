"use client"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery, useQueryClient } from "react-query";

const Query = async (id)=>{
    return await getDocs(query(collection(db, "Motion Graphics Term"), where("id", "==", +id)))
}

export default async function SingleTermQuery(id) {

  const QueryClient = useQueryClient()
   
  return useQuery('QueryData', ()=>Query(+id),{
    initialData: ()=>{
      const qData = QueryClient.getQueryData('MotionData')?.data?.docs.map(x=>{
        return {
          ...x.data()
        }
      })
      const iniData = qData?.find(x=>parseInt(x.id) === parseInt(id))
      return {
        
      }
    }
  })
}
