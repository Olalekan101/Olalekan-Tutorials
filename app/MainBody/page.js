import HeroSection from "./Herosection/page";
import Terminology from "./Terminology/page";
import QuestionSection from "./question-section/page";
import TextAnimationAcross from "../Components/TextAnimation/TextAnimationAcross";

const MainBody = () => {
    return ( 
        <main className="flex flex-col items-center w-full mt-[30px] overflow-clip">
            {/* <img src={Anchorpoint} alt="Mask icon"/> */}
            <HeroSection/>
            <Terminology/>
            <QuestionSection/>
            {/* <TextAnimationAcross/> */}
        </main>
     );
}
 
export default MainBody;