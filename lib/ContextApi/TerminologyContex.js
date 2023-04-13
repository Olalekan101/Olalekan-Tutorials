import { createContext,use, cache,useState, useMemo } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

export const TerminologyContext = createContext({
    Terminology: ()=>{},
    addTerminology: async ()=>{},
    updateTerminology: async ()=>{},
    deleteTerminology: async () =>{}
})

const TermCache = cache( async()=>{
    return await getDocs(collection(db, "Motion Graphics Term"));
})

const queryClient = new QueryClient()

export default function TerminologyProvider({children}){
    //Getting the Data fromm he database
    // const [Terminology, setVal] = useState([])
    // const docData = use(TermCache())
    // const dataa = docData.docs.map((doc)=>{
    //         return{
    //         ...doc.data()
    //         }})
    // const MemoData = useMemo(()=>{
    //     setVal(dataa)
    // },[])
    const Terminology = ()=>{
        return (
            useQuery("MotionTerms",TermCache)
        )
    }

    
    //Creating the create terminology function
    
    const addTerminology = async (items)=>{
        return await addDoc(collection(db, "Motion Graphics Term"), items)
    }

    // updating the terminology

    const updateTerminology = async (updateitems) =>{
        return await updateDoc(collection(db, "Motion Graphics Term"), updateitems)
    }

    //delete function

    const deleteTerminology = async (terminologyId) =>{
        const deleteRef = doc(db,"Motion Graphics Term",terminologyId)
        return await updateDoc(deleteRef)
    }

    // const deleteTerminology = async ({deleteId})=>{
    //     return await 
    // }

    // values for the context
    const values = {Terminology,addTerminology,updateTerminology, deleteTerminology}

    return <TerminologyContext.Provider value={values}>
            {children}
    </TerminologyContext.Provider>
}