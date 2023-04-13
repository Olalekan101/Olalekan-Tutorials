import { Matte } from "../svgIcons/Svgs"

const Rives = [
    {
        name: "Mask",
        src: ()=> <Matte className="text-[200px]"/>
    },
    {
        name: "Frame Rate",
        src: "2"
    },
    {
        name: "Group",
        src: "3"
    },
    {
        name: "Keyframe",
        src: "4"
    },
]

export default function RiveComponents(key) {
    const dataa = Rives.filter(x=>x.name === key)
  return (
    <div>
        {dataa.map(x=>(
           <p className="font-bold text-2xl">{x.src()}</p>
        ))}
    </div>
  )
}
