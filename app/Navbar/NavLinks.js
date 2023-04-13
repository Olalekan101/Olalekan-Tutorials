import Link from "next/link";


export function Navlink({loca='/',locaName}){
    return (
    <li>
        <Link href={`/${loca}`} className='border-b-2 border-slate-400 '>
        {locaName}
    </Link>
    </li>
    )
}


export default function Navlinks({direction=true}){
    let Col = 'flex-row max-sm:hidden gap-2'
    if(!direction){
        Col = "flex-col text-right text-xm gap-1"
    }
    return(

        <ul className={`flex ${Col}  text-lg`}>
        <Navlink locaName={"Home"}/>
        <Navlink loca={'Resources'} locaName={"Resources"}/>
        <Navlink loca={'About'} locaName={"About"}/>
        <Navlink loca={'Course'} locaName={"Course"}/> 
        </ul>
    )
}