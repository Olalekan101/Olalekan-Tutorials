import BackButton from "../Components/BackButton"

export const metadata = {
  title: "Motion Graphic Courses",
}

export default function Course() {
  return (
    <div className="mt-5 flex flex-col items-center">
        <div><p className="text-center text-lg sm:text-2xl opacity-50">Welcome 😎 These are the available motion graphic courses.</p></div>
        <div className="mt-10 flex flex-col items-center">
            <div className="h-[150px] p-6 flex flex-col items-center justify-center rounded-md bg-green-500">
                <p className="text-5xl animate-bounce text-center mb-4">?</p>
                <p className="opacity-50">We are working on it.</p>
            </div>
            <div className="mt-5" ><BackButton/></div>
        </div>
    </div>
  )
}
