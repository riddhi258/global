import { useEffect, useRef } from "react";

const destination = [
  {
    name: "New Zealand",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Australia",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Canada",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "UK",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Italy",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&q=80",
  },
];

const Destination = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let frameId;
    const speed = 0.5;

    const animate = () => {
      if (!slider) return;
      slider.scrollLeft += speed;
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft -= slider.scrollWidth / 2;
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:ml-8 xl:ml-0 lg:py-[70px]">
      <div className="mx-auto w-full max-w-[1350px] px-5 sm:px-8 lg:px-0">

        {/* Heading */}
        <div className="mb-8 md:mb-10 lg:mb-[28px]">
          <p
            className="text-[25px] leading-[1.15] text-[#26839A] md:text-[28px] lg:text-[40px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Start with
          </p>

          <h2
            className="mt-0 text-[32px] font-bold leading-[1.1] text-[#82CBAA] sm:text-[38px] md:text-[42px] lg:text-[60px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Your Destination
          </h2>
        </div>

        {/* Cards */}
        <div className="relative">
          <div
            id="destination-slider"
            ref={sliderRef}
            className="
              flex
              gap-[22px]
              overflow-x-auto
              pb-4
              scrollbar-hide
              md:gap-[26px]
              lg:overflow-hidden
            "
          >
            {destination.concat(destination).map((destination, index) => (
              <div
                key={`${destination.name}-${index}`}
                className="
                  group
                  relative
                  h-[300px]
                  min-w-[245px]
                  overflow-hidden
                  rounded-[25px]
                  sm:h-[330px]
                  sm:min-w-[170px]
                  md:h-[350px]
                  md:min-w-[190px]
                  lg:h-[300px]
                  lg:min-w-[220px]
                  lg:flex-1
                "
              >
                {/* Image */}
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Bottom gradient */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-[45%]
                    bg-gradient-to-t
                    from-black/80
                    via-black/35
                    to-transparent
                  "
                />

                {/* Name */}
                <div className="absolute bottom-5 left-0 right-0 text-center">
                  <p
                    className="text-[15px] font-medium text-white md:text-[16px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {destination.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destination;