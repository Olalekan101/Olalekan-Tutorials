import Link from "next/link";

export function Button(text="Olalekan",link="/") {
    return <Link href={link}><button className=" btnStyle ">{text}</button></Link>;
  }