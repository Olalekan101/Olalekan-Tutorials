"use client"
import { cache } from "react";
import { collection, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery } from "react-query";


const TermCache = async()=>{
  return await getDocs(collection(db, "Motion Graphics Term"));
}

export default function MotionTerminology() {
  return  useQuery("MotionData", TermCache,{
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 300000
  })
}
