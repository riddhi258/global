import img from "../assets/img17.png";
import call from "../assets/Path.png";
import whatsapp from "../assets/whatsapp.png";
import email from "../assets/Rectangle.svg"
import clock from "../assets/clock.png"
import location from "../assets/location1.png"
import Contact from "../Components/Contact";

const ContactUs = () => {
  return (
    <>
      <section
        className="
             relative
             h-[300px]
             w-full
             overflow-hidden
             sm:h-[340px]
             md:h-[370px]
             lg:h-[480px]
           "
      >
        <img
          src={img}
          alt="About Us banner"
          className="
               absolute
               inset-0
               h-full
               w-full
               object-cover
             "
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(89.92deg, #FFFFFF 0.06%, rgba(255, 255, 255, 0.79) 20.33%, rgba(255, 255, 255, 0) 48.4%)",
          }}
        />

        {/* Banner Content */}
        <div
          className="
               relative
               z-10
               mx-auto
               flex
               h-full
               w-full
               max-w-[1256px]
               flex-col
               justify-center
               px-5
               sm:px-8
               md:px-12
               lg:px-0
             "
        >
          {/* Breadcrumb */}
          <p
            className="
                 mb-2
                 text-[14px]
                 sm:text-[16px]
                 md:text-[17px]
                 lg:text-[18px]
               "
          >
            <span className="text-sky-500 lg:ml-10 xl:ml-0">Home &gt; </span>
            <span className="text-cyan-800">Contact Us</span>
          </p>

          {/* Banner Heading */}
          <h1
            className="
                 mt-6
                 text-[32px]
                 font-semibold
                 leading-[1.1]
                 w-full
                 text-[#669980]
                 sm:mt-10
                 sm:text-[44px]
                 md:mt-16
                 md:text-[52px]
                 lg:mt-20
                 lg:ml-10
                 lg:text-[60px]
                 xl:ml-0
               "
          >
            Contact Us
          </h1>
        </div>
      </section>
      <section
        className="
             relative
             h-[1710px]
             w-full
             overflow-hidden
           "
      >
        <div className="w-full mt-[50px]">
          <p className="w-[422px] h-[60px] text-[40px] ml-140 text-[#4298A9]">
            Stay Connected With
          </p>
          <h1 className="w-[682px] h-[42px] text-[60px] text-[#5B9E7D] ml-110 mt-[-10px] font-semibold">
            Growmore Global Visa
          </h1>
        </div>
        <div className="w-[1070px] h-[753px] mt-20 ml-[182px] gap-[90px]">
          <div className="w-[490px] h-[278px] gap-[30px]">
            <p className="w-490px h-[15px] text-[22px] text-slate-400 text-center font-semibold">
             Australia
            </p>
            <div className="flex gap-[20px] mt-8">
              <div className="flex h-[64px] w-[240px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={call}
                  alt="Call icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-10px]">
                  <p className="h-[10px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    Requesting A Call
                  </p>
                  <p className="mt-3 h-[11px] w-[120px] text-[16px] font-semibold text-cyan-600">
                    (03) 8764 3334
                  </p>
                </div>
              </div>
              <div className="flex h-[64px] w-[240px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={whatsapp}
                  alt="whatsapp icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-10px]">
                  <p className="h-[10px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    WhatsApp
                  </p>
                  <p className="mt-3 h-[11px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    (+61) 43450 5002
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-[20px] mt-4">
              <div className="flex h-[64px] w-[280px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={email}
                  alt="email icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-10px]">
                  <p className="h-[10px] w-[160px] text-[16px] font-semibold text-cyan-600">
                    Email
                  </p>
                  <p className="mt-3 h-[11px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    study@growmore.one
                  </p>
                </div>
              </div>
              <div className="flex h-[64px] w-[240px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={clock}
                  alt="clock icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-10px]">
                  <p className="h-[10px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    9 am -5 pm
                  </p>
                  <p className="mt-3 h-[11px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    Monday-Friday
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-[20px] mt-4">
              <div className="flex h-[94px] w-[490px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={location}
                  alt="location icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-30px]">
                  <p className="h-[10px] w-[160px] text-[16px] font-semibold text-cyan-600">
                    Location
                  </p>
                  <p className="mt-3 h-[11px] w-[420px] text-[16px] font-semibold text-cyan-600">
                    313/101 Overton Road, Williams Landing, Victoria, 3027, Australia.
                  </p>
                </div>
              </div>
          </div>
            <div className="h-[350px] w-full rounded-lg mt-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.722581616605!2d144.7450264!3d-37.86678109999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad689c0228e6b0b%3A0x3e9f44742eb30ff9!2sGrowMore%20Global%20Visa%20Melbourne%20Australia!5e0!3m2!1sen!2sin!4v1773826957605!5m2!1sen!2sin"
                className="w-full h-full rounded-xl"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
        </div>
          <div className="w-[490px] h-[278px] gap-[30px] ml-160 mt-[-280px]">
            <p className="w-490px h-[15px] text-[22px] text-slate-400 text-center font-semibold">
             India
            </p>
            <div className="flex gap-[20px] mt-8">
              <div className="flex h-[64px] w-[240px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={call}
                  alt="Call icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-10px]">
                  <p className="h-[10px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    Requesting A Call
                  </p>
                  <p className="mt-3 h-[11px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    (+91) 9081899668
                  </p>
                </div>
              </div>
              <div className="flex h-[64px] w-[240px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={whatsapp}
                  alt="whatsapp icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-10px]">
                  <p className="h-[10px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    WhatsApp
                  </p>
                  <p className="mt-3 h-[11px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    (+91) 9081899669
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-[20px] mt-4">
              <div className="flex h-[64px] w-[280px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={email}
                  alt="email icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-10px]">
                  <p className="h-[10px] w-[160px] text-[16px] font-semibold text-cyan-600">
                    Email
                  </p>
                  <p className="mt-3 h-[11px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    study@growmore.one
                  </p>
                </div>
              </div>
              <div className="flex h-[64px] w-[240px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={clock}
                  alt="clock icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-10px]">
                  <p className="h-[10px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    9 am -5 pm
                  </p>
                  <p className="mt-3 h-[11px] w-[140px] text-[16px] font-semibold text-cyan-600">
                    Monday-Saturday
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-[20px] mt-4">
              <div className="flex h-[94px] w-[490px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                <img
                  src={location}
                  alt="location icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-col ml-3 mt-[-30px]">
                  <p className="h-[10px] w-[160px] text-[16px] font-semibold text-cyan-600">
                    Location
                  </p>
                  <p className="mt-3 h-[11px] w-[420px] text-[16px] font-semibold text-cyan-600">
                    417, Block A, ISCON Centre, Shivranjini Cross Roads, Ahmedabad, Gujarat 380015.
                  </p>
                </div>
              </div>
          </div>
            <div className="h-[350px] w-full rounded-lg mt-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.991827088126!2d72.5299896!3d23.024072299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e858c5649e9f7%3A0x417159f01a72ec1c!2sGrowmore%20Global%20Visa!5e0!3m2!1sen!2sin!4v1773825960657!5m2!1sen!2sin%22"
                className="w-full h-full rounded-xl"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
        </div>
        </div>
       <Contact/>
      </section>
    </>
  );
};

export default ContactUs;
