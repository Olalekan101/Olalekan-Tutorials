"use client"
import Link from "next/link";
import Navlinks from "./NavLinks";
import Hambuger from "./Hambuger";
import {GiFootprint} from "react-icons/gi"
import { useSelectedLayoutSegments,useRouter, useSelectedLayoutSegment } from "next/navigation";
import { usePathname } from "next/navigation";


const Navbar = () => {
        const urlValue = useSelectedLayoutSegments()
        const currValue = useSelectedLayoutSegment()
        const pathName = usePathname()
        const pushUrl = useRouter()
        const question = pathName.includes('question-section')
        const course = pathName.includes('Course')
    return ( 
<nav className=" sticky backdrop-blur-sm bg-darkColor/80 top-0 inset-0 z-10 flex gap-2 justify-between items-center mx-auto px-2 py-2 w-full">
            <Link href={"/"}><h1 className="opacity-50 text-xs sm:text-base text-center">Olalekan<br className="block sm:hidden "/> Tutorials</h1></Link>
            <ul className="flex gap-2 flex-end text-xs sm:text-sm">
                <li className="">{urlValue.length === 0 ?<button ><a href="#questions">Questions</a></button>: <button 
                className={`${question ? "font-bold underline underline-offset-1 text-green-500" : "font-thin "}`}
                onClick={()=>pushUrl.push("/MainBody/question-section")}>Questions</button> } </li>
                <li className={`${course ? "font-bold underline underline-offset-1 text-green-500" : "font-thin "}`}> <Link href='/Course' >Course</Link> </li>
            </ul>
        </nav>
     );
}
 
export default Navbar;