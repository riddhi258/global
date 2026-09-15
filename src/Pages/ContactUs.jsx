import img from "../assets/img17.png";
import call from "../assets/Path.png";
import whatsapp from "../assets/whatsapp.png";
import email from "../assets/Rectangle.svg";
import clock from "../assets/clock.png";
import location from "../assets/location1.png";
import Contact from "../Components/Contact";

const ContactUs = () => {
  const offices = [
    {
      country: "Australia",
      requestCall: "(03) 8764 3334",
      whatsapp: "(+61) 43450 5002",
      email: "study@growmore.one",
      hours: "Monday-Friday",
      hoursLabel: "9 am -5 pm",
      address: "313/101 Overton Road, Williams Landing, Victoria, 3027, Australia.",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.722581616605!2d144.7450264!3d-37.86678109999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad689c0228e6b0b%3A0x3e9f44742eb30ff9!2sGrowMore%20Global%20Visa%20Melbourne%20Australia!5e0!3m2!1sen!2sin!4v1773826957605!5m2!1sen!2sin",
    },
    {
      country: "India",
      requestCall: "(+91) 9081899668",
      whatsapp: "(+91) 9081899669",
      email: "study@growmore.one",
      hours: "Monday-Saturday",
      hoursLabel: "9 am -5 pm",
      address: "417, Block A, ISCON Centre, Shivranjini Cross Roads, Ahmedabad, Gujarat 380015.",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.991827088126!2d72.5299896!3d23.024072299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e858c5649e9f7%3A0x417159f01a72ec1c!2sGrowmore%20Global%20Visa!5e0!3m2!1sen!2sin!4v1773825960657!5m2!1sen!2sin%22",
    },
  ];

  return (
    <>
      <section
        className="relative h-[300px] w-full overflow-hidden sm:h-[340px] md:h-[370px] lg:h-[480px]"
      >
        <img
          src={img}
          alt="About Us banner"
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
            <span className="text-cyan-800">Contact Us</span>
          </p>

          <h1 className="mt-6 w-full text-[32px] font-semibold leading-[1.1] text-[#669980] sm:mt-10 sm:text-[44px] md:mt-16 md:text-[52px] lg:mt-20 lg:ml-10 lg:text-[60px] xl:ml-0">
            Contact Us
          </h1>
        </div>
      </section>

      <section className="relative w-full h-[1780px] overflow-hidden py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1256px] px-4 sm:px-8 md:px-12 lg:px-0">
          <div className="mb-10 flex flex-col items-center text-center md:items-start md:text-left">
            <p className="text-[28px] leading-none lg:ml-80 xl:ml-110 text-[#4298A9] sm:text-[34px] md:text-[40px]">
              Stay Connected With
            </p>
            <h1 className="mt-4 text-[36px] font-semibold leading-none text-[#5B9E7D] lg:ml-50 xl:ml-80 sm:text-[48px] md:text-[60px]">
              Growmore Global Visa
            </h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {offices.map((office) => (
              <div key={office.country} className="w-full">
                <div className="mb-6 text-center">
                  <p className="text-[22px] font-semibold text-slate-400">{office.country}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex h-[64px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                    <img src={call} alt="Call icon" className="h-[30px] w-[30px]" />
                    <div className="ml-3 flex flex-col">
                      <p className="text-[16px] font-semibold text-cyan-600">Requesting A Call</p>
                      <p className="mt-3 text-[16px] font-semibold text-cyan-600">{office.requestCall}</p>
                    </div>
                  </div>

                  <div className="flex h-[64px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                    <img src={whatsapp} alt="whatsapp icon" className="h-[30px] w-[30px]" />
                    <div className="ml-3 flex flex-col">
                      <p className="text-[16px] font-semibold text-cyan-600">WhatsApp</p>
                      <p className="mt-3 text-[16px] font-semibold text-cyan-600">{office.whatsapp}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex h-[64px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                    <img src={email} alt="email icon" className="h-[30px] w-[30px]" />
                    <div className="ml-3 flex flex-col">
                      <p className="text-[16px] font-semibold text-cyan-600">Email</p>
                      <p className="mt-3 text-[16px] font-semibold text-cyan-600">{office.email}</p>
                    </div>
                  </div>

                  <div className="flex h-[64px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                    <img src={clock} alt="clock icon" className="h-[30px] w-[30px]" />
                    <div className="ml-3 flex flex-col">
                      <p className="text-[16px] font-semibold text-cyan-600">{office.hoursLabel}</p>
                      <p className="mt-3 text-[16px] font-semibold text-cyan-600">{office.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex h-auto min-h-[94px] items-center gap-3 rounded-[10px] bg-slate-100 px-[20px] py-[14px]">
                  <img src={location} alt="location icon" className="h-[30px] w-[30px]" />
                  <div className="ml-3 flex flex-col">
                    <p className="text-[16px] font-semibold text-cyan-600">Location</p>
                    <p className="mt-3 text-[16px] font-semibold text-cyan-600">{office.address}</p>
                  </div>
                </div>

                <div className="mt-8 h-[300px] w-full overflow-hidden rounded-xl sm:h-[350px]">
                  <iframe
                    src={office.map}
                    className="h-full w-full rounded-xl"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Contact />
        </div>
      </section>
    </>
  );
};

export default ContactUs;
