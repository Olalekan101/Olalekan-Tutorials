"use client"
import { useContext, useRef, useId } from "react"
import { TerminologyContext } from "@/lib/ContextApi/TerminologyContex"
import { v4 as uuidv4 } from "uuid"

export default function addTerminologyItem() {
    const {addTerminology} = useContext(TerminologyContext)
    const TerminologyRef = useRef()
    const ExplanationRef = useRef()
    const VisualRef = useRef()
    const Ran = uuidv4()

    const handleCreate = async(e)=>{
        e.preventDefault()

        if(!TerminologyRef.current.value|| !ExplanationRef.current.value || ! VisualRef.current.value){
          return console.log('fill in the fields');
      }
      const createValues = {
          Terminology: TerminologyRef.current.value,
          Explanation: ExplanationRef.current.value,
          Visual: VisualRef.current.value,
          id: Ran
      }
        console.log(Ran);
        console.log(createValues);
        try {
            await addTerminology(createValues)
            TerminologyRef.current.value="",
            ExplanationRef.current.value="",
            VisualRef.current.value=""
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
      <div>
        <form className="flex flex-col gap-3" onSubmit={handleCreate}>
        <input ref={TerminologyRef} type={"text"} className="input" placeholder="Terminology" />
        <textarea  ref={ExplanationRef} name="definition" cols={6} rows={6} className="input" placeholder="Explanation" />
        <input  type={"text"} ref={VisualRef} className="input" placeholder="Visual"/>
        <button type={"submit"} className="btnform">Create</button>
      </form>
      </div>
    )
  }
  