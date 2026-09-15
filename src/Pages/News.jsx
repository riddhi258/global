import NewsSection from "../Components/NewsSection";
import img from "../assets/img17.png";


const News = () => {
  return (
    <>
      <div>
       <section
               className="relative h-[300px] w-full overflow-hidden sm:h-[340px] md:h-[370px] lg:h-[480px]"
             >
               <img
                 src={img}
                 alt="News banner"
                 className="absolute inset-0 h-full w-full object-cover"
               />
       
               <div
                 className="absolute inset-0"
                 style={{
                   background:
                     "linear-gradient(89.92deg, #FFFFFF 0.06%, rgba(255, 255, 255, 0.79) 20.33%, rgba(255, 255, 255, 0) 48.4%)",
                 }}
               />
       
               <div className="relative z-10 mx-auto flex h-full w-full max-w-[1256px] flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-0">
                 <p className="mb-2 text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px]">
                   <span className="text-sky-500 lg:ml-10 xl:ml-0">Home &gt; </span>
                   <span className="text-cyan-800">News</span>
                 </p>
       
                 <h1 className="mt-6 w-full text-[32px] font-semibold leading-[1.1] text-[#669980] sm:mt-10 sm:text-[44px] md:mt-16 md:text-[52px] lg:mt-20 lg:ml-10 lg:text-[60px] xl:ml-0">
                   News
                 </h1>
               </div>
             </section>{" "}
        <NewsSection />
      </div>
    </>
  );
};

export default News;
