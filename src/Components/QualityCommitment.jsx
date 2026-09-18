import { useEffect, useState } from "react";
import image2 from "../assets/image2.png";
import image1 from "../assets/image1.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/icon6.png";
import i1 from "../assets/icon.png";

const commitmentItems = [
  {
    type: "image",
    icon: image4,
    title: "Ongoing Commitment",
    description:
      "We remain committed to helping you move forward with clarity, confidence, and the right direction.",
  },
  {
    type: "image",
    icon: image3,
    title: "Expert Support",
    description:
      "We assist with eligibility assessment, documentation, application preparation, and ongoing support.",
  },
  {
    type: "image",
    icon: image2,
    title: "Honest Advice",
    description:
      "We provide clear, transparent and honest advice to help you make confident decisions.",
  },
  {
    type: "image",
    icon: image1,
    title: "Tailored Guidance",
    description:
      "We provide personalised guidance because every client and every immigration journey is different.",
  },
  {
    type: "image",
    icon: image5,
    title: "Clear Process",
    description:
      "We simplify complex visa requirements and explain each stage in clear, practical language.",
  },
  {
    type: "image",
    icon: image6,
    title: "Client Focus",
    description:
      "We understand your background, goals, and concerns before recommending a suitable pathway.",
  },
];

const QualityCommitment = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % commitmentItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getItem = (position) => {
    const index = (activeIndex + position) % commitmentItems.length;

    return commitmentItems[index];
  };

  const leftItem = getItem(0);
  const centerItem = getItem(1);
  const rightItem = getItem(2);

  const renderIcon = (item, size = 75) => {
    if (item.type === "image") {
      return (
        <img
          src={item.icon}
          alt={item.title}
          className="h-[125px] w-[125px] object-contain"
        />
      );
    }

    const Icon = item.icon;

    return <Icon size={size} strokeWidth={1.4} className="text-[#8BCFE2]" />;
  };

  return (
    <>
      {/* =====================================================
          SLIDE ANIMATION
      ====================================================== */}

      <style>{`
        @keyframes slideRightToLeft {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-right-to-left {
          animation: slideRightToLeft 0.8s ease-out;
        }
      `}</style>

      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-[linear-gradient(90deg,#EEF7FC_0%,#FBF6E9_100%)]

          px-5
          py-10

          sm:px-8
          sm:py-12

          md:px-8
          md:py-14
          md:h-[500px]

          xl:h-[576px]
          xl:px-0
          xl:py-[42px]
        "
      >
        <div
          className="
            relative
            mx-auto
            h-auto
            w-full
            max-w-[1278px]

            xl:h-full
          "
        >
          {/* =====================================================
              HEADING
          ====================================================== */}

          <div
            className="
              relative
              z-40

              xl:absolute
              xl:left-0
              xl:top-0
            "
          >
            <p
              className="
                m-0
                text-[25px]
                font-normal
                leading-[1.15]
                text-[#26839A]

                sm:text-[29px]
                md:text-[32px]

                xl:mt-6
                xl:text-[38px]
              "
            >
              Quality and Environmental
            </p>

            <h2
              className="
                m-0
                mt-[4px]
                text-[36px]
                font-semibold
                leading-[1.05]
                text-[#669980]

                sm:text-[42px]
                md:text-[48px]

                xl:text-[50px]
                xl:text-[54px]
              "
            >
              Commitment
            </h2>
          </div>

          {/* =====================================================
              LEFT CARD
          ====================================================== */}

          <div
            className="
              relative
              mx-auto
              mt-[50px]
              h-[210px]
              w-full
              max-w-[280px]
              overflow-hidden
              rounded-[26px]
              bg-white
              shadow-[0px_4px_20px_0px_#CFCFCFB0]

              sm:h-[220px]
              sm:max-w-[300px]

              md:absolute
              md:left-0
              md:top-[175px]
              md:mt-0
              md:h-[195px]
              md:w-[180px]

              lg:left-[70px]

              xl:absolute
              xl:left-[50px]
              xl:top-[210px]
              xl:h-[240px]
              xl:w-[280px]
            "
          >
            <div
              key={`left-${activeIndex}`}
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                slide-right-to-left
              "
            >
              {renderIcon(leftItem, 68)}

              <h3
                className="
                  mt-4
                  px-4
                  text-center
                  text-[20px]
                  font-semibold
                  text-[#159B89]

                  sm:text-[21px]

                  xl:mt-5
                  xl:text-[23px]
                "
              >
                {leftItem.title}
              </h3>
            </div>
          </div>

          {/* =====================================================
              CENTER CARD
          ====================================================== */}

          <div
            className="
              relative
              mx-auto
              mt-5
              h-[285px]
              w-full
              max-w-[500px]
              overflow-hidden
              rounded-[30px]
              bg-white
              shadow-[0px_4px_20px_0px_#00000033]

              sm:h-[290px]

              md:absolute
              md:left-1/2
              md:top-[125px]
              md:mt-0
              md:w-[280px]
              md:-translate-x-1/2

              lg:absolute
              lg:left-[300px]
              lg:top-[132px]
              lg:h-[260px]
              lg:w-[420px]
              lg:translate-x-0

              xl:absolute
              xl:left-[390px]
              xl:top-[182px]
              xl:h-[290px]
              xl:w-[500px]
              xl:translate-x-0
            "
          >
            {/* Fixed Header */}

            <div
              className="
                flex
                h-[45px]
                w-full
                items-center
                justify-center
                rounded-tl-[30px]
                rounded-tr-[30px]
                bg-[#185C6B]
              "
            >
              <div className="flex items-center gap-2 text-white">
                <img
                  src={i1}
                  alt="Visa"
                  className="
                    h-[21px]
                    w-[21px]
                    object-contain
                  "
                />

                <span
                  className="
                    text-[20px]
                    font-semibold
                    lg:text-[22px]
                    xl:text-[22px]
                  "
                >
                  Visa
                </span>
              </div>
            </div>

            {/* Center Content */}

            <div
              key={`center-${activeIndex}`}
              className="
                flex
                h-[240px]
                w-full
                items-center
                px-5
                slide-right-to-left

                sm:px-7

                md:px-4
                lg:h-[200px]
                lg:px-6
                xl:h-[245px]
                xl:px-8
              "
            >
              {/* Icon */}

              <div
                className="
                  flex
                  w-[125px]
                  shrink-0
                  items-center
                  justify-center

                  sm:w-[150px]

                  md:w-[105px]

                  xl:w-[185px]
                "
              >
                {renderIcon(centerItem, 82)}
              </div>

              {/* Content */}

              <div
                className="
                  min-w-0
                  pl-1

                  xl:pl-2
                "
              >
                <h3
                  className="
                    text-[20px]
                    font-semibold
                    leading-tight
                    text-[#83BEE5]

                    sm:text-[22px]

                    md:text-[20px]

                    xl:text-[25px]
                  "
                >
                  {centerItem.title}
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[260px]
                    text-[14px]
                    leading-[1.45]
                    text-[#159B89]

                    sm:text-[15px]

                    md:max-w-[190px]
                    md:text-[13px]
                    
                  lg:mt-3
                    lg:max-w-[240px]
                    lg:text-[18px]

                    xl:mt-2
                    xl:max-w-[260px]
                    xl:text-[17px]
                  "
                >
                  {centerItem.description}
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT CARD
          ====================================================== */}

          <div
            className="
              relative
              mx-auto
              mt-5
              h-[210px]
              w-full
              max-w-[280px]
              overflow-hidden
              rounded-[26px]
              bg-white
              shadow-[0px_4px_20px_0px_#CFCFCFB0]

              sm:h-[220px]
              sm:max-w-[300px]

              md:absolute
              md:right-0
              md:top-[175px]
              md:mt-0
              md:h-[195px]
              md:w-[180px]
              
              lg:left-[690px]
              xl:absolute
              xl:left-[950px]
              xl:right-auto
              xl:top-[210px]
              xl:h-[240px]
              xl:w-[280px]
            "
          >
            <div
              key={`right-${activeIndex}`}
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                slide-right-to-left
              "
            >
              {renderIcon(rightItem, 68)}

              <h3
                className="
                  mt-4
                  px-4
                  text-center
                  text-[20px]
                  font-semibold
                  text-[#159B89]

                  sm:text-[21px]

                  xl:mt-5
                  xl:text-[23px]
                "
              >
                {rightItem.title}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QualityCommitment;
