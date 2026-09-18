import { motion } from "framer-motion";
import a1 from "../assets/a1.png";

const Overseas = () => {
  // Container variant to handle staggered animations for child items coming from the bottom
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each benefit animation
      },
    },
  };

  // Variant for elements coming from the top (Intro text)
  const topVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Variant for elements coming from the bottom (Benefits list)
  const bottomVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const benefitsData = [
    {
      title: "Enhanced Career Prospects",
      desc: "Work in high-demand sectors and access global opportunities.",
    },
    {
      title: "Higher Earning Potential",
      desc: "Competitive salaries and international benefits improve financial security.",
    },
    {
      title: "Quality of Life",
      desc: "Modern infrastructure, safe communities, and balanced lifestyles.",
    },
    {
      title: "Global Exposure & Skill Development",
      desc: "Gain cross-cultural experience and expand your professional skillset.",
    },
    {
      title: "Education & Healthcare",
      desc: "Access world-class education and healthcare services for your family.",
    },
    {
      title: "Long-Term Settlement",
      desc: "Pathways to permanent residency or citizenship for stability.",
    },
    {
      title: "Personal Growth",
      desc: "Experience independence, confidence, and cultural enrichment.",
    },
  ];

  return (
    <section
      className="
        w-full
        mt-[20px]
        min-h-[1100px]
        sm:mt-[-100px]
        md:mt-[-120px]
        lg:mt-[-140px]
        xl:mt-0
        xl:h-[860px]
        lg:h-[950px]
        md:h-[1550px]
        lg:mt-[-20px]
        lg:min-h-[800px]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1350px]
          px-5
          sm:px-8
          md:px-8
          lg:px-10
          xl:px-8
        "
      >
        {/* ================= HEADER ================= */}
        <div className="mb-8 sm:mb-10 md:mb-12 xl:mb-14">
          <p
            className="
              m-0
              pt-4
              text-[24px]
              leading-[1.15]
              text-[#26839A]
              sm:text-[26px]
              md:text-[28px]
              lg:text-[24px]
              xl:pt-10
              xl:text-[40px]
            "
          >
            Top Advantages of
          </p>

          <h2
            className="
              m-0
              mt-1
              text-[30px]
              font-bold
              leading-[1.05]
              text-[#5B9E7D]
              sm:text-[34px]
              md:text-[40px]
              lg:text-[34px]
              xl:text-[60px]
            "
          >
            Moving Overseas
          </h2>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1250px]
            flex-col
            items-center
            gap-8
            sm:gap-10
            md:gap-12
            lg:flex-row
            lg:items-start
            lg:gap-[40px]
            xl:gap-[30px]
            2xl:gap-[80px]
          "
        >
          {/* ================= IMAGE ================= */}
          <div
            className="
              w-full
              shrink-0
              lg:w-[550px]
              xl:w-[650px]
              2xl:w-auto
            "
          >
            <img
              src={a1}
              alt="Migrating abroad"
              className="
                block
                h-auto
                w-full
                rounded-[30px]
                object-cover
                sm:rounded-[40px]
                md:max-h-[500px]
                lg:mt-[20px]
                lg:ml-[-10px]
                lg:h-[460px]
                lg:w-[550px]
                lg:rounded-[50px]
                xl:h-[460px]
                xl:w-[650px]
                2xl:w-[668px]
              "
            />
          </div>

          {/* ================= CONTENT ================= */}
          <div
            className="
              w-full
              lg:mt-[-120px]
              lg:w-[550px]
              xl:mt-[-100px]
              xl:w-[550px]
              2xl:mt-[-120px]
              2xl:w-[551px]
            "
          >
            {/* Intro Text (Animates from Top) */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={topVariants}
              className="
                w-full
                text-justify
                text-[15px]
                font-semibold
                leading-[1.6]
                text-teal-600
                sm:text-[16px]
                md:text-[17px]
                lg:text-[18px]
                xl:text-[18px]
              "
            >
              Migrating abroad offers more than just a new address. It’s an
              opportunity to grow professionally, personally, and financially.
              Its key benefits include:
            </motion.p>

            {/* ================= BENEFITS (Animates from Bottom) ================= */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="
                mt-6
                flex
                w-full
                flex-col
                gap-6
                sm:mt-7
                sm:gap-7
                md:mt-8
                md:gap-8
                lg:mt-[7px]
                lg:gap-0
              "
            >
              {benefitsData.map((benefit, index) => (
                <motion.p
                  key={index}
                  variants={bottomVariants}
                  className="
                    m-0
                    w-full
                    text-[16px]
                    leading-[1.5]
                    sm:text-[17px]
                    lg:mt-1
                    lg:text-[18px]
                  "
                >
                  <span
                    className="
                      text-[18px]
                      font-semibold
                      text-cyan-600
                      sm:text-[19px]
                      lg:text-[20px]
                    "
                  >
                    {benefit.title}
                  </span>
                  <br />
                  {benefit.desc}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overseas;