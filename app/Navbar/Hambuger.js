"use client"

import {RxHamburgerMenu} from "react-icons/rx"
import Navlinks from "./NavLinks";
import { useState } from "react";


const Hambuger = () => {
    const [ reveal, setReveal] = useState(false)
    function handleReveal(){
        return(
            setReveal(!reveal)
            )
        }
    return ( 
        <>
        <div className="hidden max-sm:flex">
        {reveal ? "" : <RxHamburgerMenu className="" onClick={handleReveal}/> }
        </div>
            {reveal ?  
            <div className="absolute top-0 right-0 flex justify-end bg-slate-800 w-full h-full opacity-30"
            onClick={handleReveal}
            >
            <div className=" bg-slate-400 w-[50%] px-2 pt-2 "><Navlinks direction={false} /> </div>
             </div>
            
            : ""}
        </>
     );
}

 
export default Hambuger;