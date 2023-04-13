import {BsTelephoneFill} from "react-icons/bs"
import {MdEmail} from "react-icons/md"


export default function Footer() {
  return (
    <div id="footer" className="mt-auto h-[150px] text-sm flex flex-col gap-3 justify-center items-center opacity-50">
      <p>Olalekan Tutorials 🌍</p>
      <div className="flex gap-2">
        <a href="tel:+2347010174548" ><BsTelephoneFill/></a>
        <a href="mailto:esanolasunny@gmail.com" ><MdEmail/></a>
      </div>
    </div>
  )
}
