import { Anchor,Camera,Curve,Framerate,Group,Keyframe,Layer,Matte,Null,Object,Resolution,Timeline } from "./svgIcons/Svgs" 



const Icons = [
    {
        name: "Mask",
        src: (style)=><Matte className={`${style}`} />
    },
    {
        name: "Frame Rate",
        src: (style)=><Framerate className={`${style}`} />

    },
    {
        name: "Group",
        src: (style)=><Group className={`${style}`} />

    },
    {
        name: "Keyframe",
        src: (style)=><Keyframe className={`${style}`} />

    },
    {
        name: "Anchor point",
        src: (style)=><Anchor className={`${style}`} />

    },
    {
        name: "Camera",
        src: (style)=><Camera className={`${style}`} />

    },
    {
        name: "Curve",
        src: (style)=><Curve className={`${style}`} />

    },
    {
        name: "Layer",
        src: (style)=><Layer className={`${style}`} />

    },
    {
        name: "Null",
        src: (style)=><Null className={`${style}`} />

    },
    {
        name: "Object",
        src: (style)=><Object className={`${style}`} />

    },
    {
        name: "Resolution",
        src: (style)=><Resolution className={`${style}`} />

    },
    {
        name: "Timeline",
        src: (style)=><Timeline className={`${style}`} />

    },
]

export default function MotionIcons(name,style){
    const filter = Icons.filter(x=>x.name === name ) 
    return <>
        {filter.map(x=>(
            <><div key={x.name} >{x.src(style)}</div></>
        ))}
    </>
}