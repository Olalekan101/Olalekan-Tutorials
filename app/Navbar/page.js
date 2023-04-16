"use client"
import Link from "next/link";
import { useSelectedLayoutSegments,useRouter, useSelectedLayoutSegment } from "next/navigation";
import { usePathname } from "next/navigation";
import { AuthContext } from "../ContextAPI/auth-context";
import { useContext } from "react";
import {FiLogIn} from "react-icons/fi"
import {FiLogOut} from "react-icons/fi"


const Navbar = () => {
        const urlValue = useSelectedLayoutSegments()
        const currValue = useSelectedLayoutSegment()
        const pathName = usePathname()
        const pushUrl = useRouter()
        const question = pathName.includes('questionsection')
        const course = pathName.includes('course')
        const {googlesignin,logout,user,loading} = useContext(AuthContext)

    return ( 
<nav className=" sticky backdrop-blur-sm bg-darkColor/80 top-0 inset-0 z-10 flex gap-2 justify-between items-center mx-auto px-2 py-2 w-full">
            <Link href={"/"}><h1 className="opacity-50 text-xs sm:text-base text-center">Olalekan<br className="block sm:hidden "/> Tutorials</h1></Link>
            <div>
            <ul className="flex gap-2 flex-end text-xs sm:text-sm">
                <li className="">{urlValue.length === 0 ?<button ><a href="#questions">Questions</a></button>: <button 
                className={`${question ? "font-bold underline underline-offset-1 text-green-500" : "font-thin "}`}
                onClick={()=>pushUrl.push("/MainBody/questionsection")}>Questions</button> } </li>
                <li className={`${course ? "font-bold underline underline-offset-1 text-green-500" : "font-thin "}`}> <Link href='/course' >Course</Link> </li>
            </ul>
            <div className={`text-sm ${user ? 'text-red-500' : 'text-green-500'}`}>
                {user && !loading ? <button onClick={()=>logout()} ><FiLogOut/></button> : <button onClick={()=>googlesignin()} ><FiLogIn/></button> }
                
            </div>
            </div>
        </nav>
     );
}
 
export default Navbar;