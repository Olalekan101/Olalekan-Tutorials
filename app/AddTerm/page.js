"use client"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "@/lib/firebase";
import { useRef,useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {IoImageOutline} from "react-icons/io5"


export default function AddTerminology() {
    
    const [terminology, setTerminology] = useState("")
    const [explain, setExplain] = useState("")
    const [inputs, setInputs] = useState([])
    const Term = useRef()
    const Explaination = useRef()
    const AddID = uuidv4()


    const HandleSubmit = async (e)=>{
        e.preventDefault();

        const AddInputs = {
            id: AddID,
            Terminology: Term.current.value,
            Explanation: Explaination.current.value,
        }
        const Collection = collection(db, "Motion Graphics Term")

        try {
            const AddTable = await addDoc( Collection , AddInputs);
        } catch (error) {
            console.log(error);
        }
        Explaination.current.value=""
        Term.current.value=""
    }
  return (
    <div className="w-screen " >
        <form onSubmit={HandleSubmit} className=" flex rounded-lg flex-col justify-center align-middle mt-6 gap-3 items-center text-darktwo" >
           <div className=" w-full sm:w-[50%] mx-auto flex flex-col" >
           <input  ref={Term}  type="text" placeholder="Terminology" />
            <textarea ref={Explaination} type="text" placeholder="Explanation" cols={5} />
            {/* <label htmlFor="image" className="flex flex-col" >
            <p className="text-white">Select icon</p>
            <div className="text-8xl text-center flex justify-center text-white/70"><IoImageOutline/></div>
            <input className="hidden" id="image" ref={Visual} type="file" name="myImage" accept="image/*" />
            </label> */}
            <button className="btnStyle text-white" type="submit">Submit</button>
           </div>
        </form>
    </div>
  )
}
