import HeroSection from "./Herosection/page";
import Terminology from "./Terminology/page";
import QuestionSection from "./questionsection/page";
import MotionDesignIsFun from "../Components/MotionDesignIsFun";

const MainBody = () => {
    return ( 
        <main className="flex flex-col items-center w-full mt-[30px] ">
            <HeroSection/>
            <Terminology/>
            <QuestionSection/>
            <MotionDesignIsFun/>
        </main>
     );
}
 
export default MainBody;