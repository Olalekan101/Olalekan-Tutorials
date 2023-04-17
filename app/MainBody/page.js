import HeroSection from "./Herosection/page";
import Terminology from "./Terminology/page";
import QuestionSection from "./questionsection/page";

const MainBody = () => {
    return ( 
        <main className="flex flex-col items-center w-full mt-[30px] ">
            {/* <img src={Anchorpoint} alt="Mask icon"/> */}
            <HeroSection/>
            <Terminology/>
            <QuestionSection/>
            {/* <TextAnimationAcross/> */}
        </main>
     );
}
 
export default MainBody;