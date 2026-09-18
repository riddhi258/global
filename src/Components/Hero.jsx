import { useState, useRef } from "react";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";

import PhoneInput from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import flags from "react-phone-number-input/flags";

import { ChevronDown, ArrowRight } from "lucide-react";

import heroImage from "../assets/hero-image.png";

import "react-phone-number-input/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* =========================================================
   CUSTOM COUNTRY SELECT
   ========================================================= */

const CountrySelect = ({ value, onChange }) => {
  const selectedCountry = value || "IN";
  const Flag = flags[selectedCountry];

  return (
    <div className="relative h-full w-full">
      <select
        value={selectedCountry}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select country"
        className="
          absolute
          inset-0
          z-20
          h-full
          w-full
          cursor-pointer
          appearance-none
          opacity-0
        "
      >
        {getCountries().map((country) => (
          <option key={country} value={country}>
            {en[country]} +{getCountryCallingCode(country)}
          </option>
        ))}
      </select>

      <div
        className="
          pointer-events-none
          flex
          h-full
          w-full
          items-center
          gap-2
          px-3
        "
      >
        {Flag && (
          <Flag
            title={en[selectedCountry]}
            className="
              h-[16px]
              w-[24px]
              shrink-0
              overflow-hidden
              rounded-[2px]
              object-cover
            "
          />
        )}

        <span className="whitespace-nowrap text-[12px] font-medium text-[#333]">
          +{getCountryCallingCode(selectedCountry)}
        </span>

        <ChevronDown
          size={14}
          className="ml-auto shrink-0 text-[#34506d]"
        />
      </div>
    </div>
  );
};

/* =========================================================
   HERO COMPONENT
   ========================================================= */

const Hero = () => {
  const recaptchaRef = useRef(null);
  const recaptchaSiteKey =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    phoneCountry: "IN",
    inquiry: "",
    country: "",
    comments: "",
  };

  const [formData, setFormData] =
    useState(initialFormData);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [statusMessage, setStatusMessage] =
    useState({
      type: "",
      text: "",
    });

  /* =========================================================
     INPUT HANDLERS
     ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneCountryChange = (newCountry) => {
    setFormData((prev) => ({
      ...prev,
      phoneCountry: newCountry,
      phone: "",
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value || "",
    }));
  };

  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatusMessage({
      type: "",
      text: "",
    });

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      toast.error(
        "Please fill in your name, email and contact number."
      );
      return;
    }

    if (
      !formData.inquiry.trim() ||
      !formData.country.trim()
    ) {
      toast.error(
        "Please select an inquiry type and destination country."
      );
      return;
    }

    /* =======================================================
       RECAPTCHA
       ======================================================= */

    const captchaToken = recaptchaRef.current
      ? recaptchaRef.current.getValue()
      : null;

    if (recaptchaSiteKey && !captchaToken) {
      toast.warn("Please verify the captcha");
      return;
    }

    setIsSubmitting(true);

    try {
      /* =====================================================
         PHONE NUMBER
         ===================================================== */

      const callingCode =
        getCountryCallingCode(
          formData.phoneCountry
        );

      const fullPhoneNumber = formData.phone
        ? `+${callingCode}${formData.phone.replace(
            `+${callingCode}`,
            ""
          )}`
        : "";

      /* =====================================================
         API PAYLOAD
         ===================================================== */

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: fullPhoneNumber,
        visaType:
          formData.inquiry || "General Inquiry",
        message:
          `[Destination Country: ${
            formData.country || "Not Specified"
          }] ${formData.comments}`.trim(),
        captchaToken,
        source: "Website Hero Form",
      };

      const apiBaseUrl =
        "https://global-murex.vercel.app";

      const response = await fetch(
        `${apiBaseUrl}/api/lead`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      /* =====================================================
         RESPONSE
         ===================================================== */

      const responseText =
        await response.text();

      let result = {};

      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(
            "The server returned an invalid response. Please try again later."
          );
        }
      }

      /* =====================================================
         SUCCESS
         ===================================================== */

      if (response.ok && result.success) {
        const successMessage =
          result.message ||
          "Thank you! Our team will contact you shortly.";

        toast.success(successMessage);

        setStatusMessage({
          type: "success",
          text: successMessage,
        });

        setFormData(initialFormData);

        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        const errorMsg =
          result.message ||
          result.error ||
          `Server error: ${response.status}`;

        toast.error(errorMsg);

        setStatusMessage({
          type: "error",
          text: errorMsg,
        });

        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error(
        "Form Submission Error:",
        err
      );

      const message =
        err.message ||
        "An error occurred while submitting your request. Please try again later.";

      toast.error(message);

      setStatusMessage({
        type: "error",
        text: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full overflow-hidden">
      <div
        className="
          relative
          w-full
          bg-gradient-to-r
          from-[#e3fff0]
          via-[#ffffff]
          to-white
        "
      >
        {/* ===================================================
            BACKGROUND GLOW
            =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-10
            h-[350px]
            w-[500px]
            rounded-full
            bg-[#c9f7df]
            opacity-30
            blur-3xl

            lg:h-[450px]
            lg:w-[600px]

            xl:h-[500px]
            xl:w-[700px]

            2xl:h-[600px]
            2xl:w-[850px]
          "
        />

        {/* ===================================================
            MAIN CONTAINER
            =================================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-[1800px]
            px-5

            sm:px-6
            md:px-8

            lg:px-8

            xl:px-16

            2xl:px-24
          "
        >
          {/* =================================================
              MAIN GRID

              IMPORTANT:
              lg = 1024px
              Therefore 1024px gets desktop layout.
              ================================================= */}

          <div
            className="
              relative
              grid
              min-h-0
              grid-cols-1
              items-center
              gap-10

              sm:gap-12
              md:gap-14

              lg:min-h-[680px]
              lg:grid-cols-[45%_55%]
              lg:gap-0

              xl:min-h-[720px]
              xl:grid-cols-[45%_55%]

              2xl:min-h-[800px]
              2xl:grid-cols-[44%_56%]
            "
          >
            {/* =================================================
                LEFT CONTENT
                ================================================= */}

            <div
              className="
                relative
                z-20
                py-12

                sm:py-14
                md:py-16

                lg:py-20

                xl:py-24

                2xl:py-28
              "
            >
              {/* WELCOME */}

              <p
                className="
                  mb-5
                  text-center
                  text-[18px]
                  font-medium
                  text-[#07517b]

                  sm:mb-6
                  sm:text-[20px]

                  md:text-[21px]

                  lg:mb-6
                  lg:text-left
                  lg:text-[22px]

                  xl:mb-7
                  xl:text-[26px]

                  2xl:mb-8
                  2xl:text-[28px]
                "
              >
                Welcome to Growmore Global Visa
              </p>

              {/* MAIN HEADING */}

              <h1
                className="
                  max-w-[700px]
                  text-center
                  font-serif
                  text-[32px]
                  font-semibold
                  leading-[1.12]
                  tracking-[-1px]
                  text-[#0c3158]

                  sm:text-[34px]

                  md:text-[38px]

                  lg:text-left
                  lg:text-[44px]

                  xl:text-[52px]

                  2xl:text-[60px]
                "
              >
                Your Global Journey
                <br />
                Starts Here
              </h1>

              {/* DIVIDER */}

              <div
                className="
                  mx-auto
                  my-5
                  h-[3px]
                  w-[92px]
                  bg-[#78cba8]

                  sm:my-6

                  lg:mx-0
                  lg:my-6

                  xl:my-7
                  xl:w-[110px]

                  2xl:my-8
                  2xl:w-[120px]
                "
              />

              {/* DESCRIPTION */}

              <p
                className="
                  mx-auto
                  max-w-[650px]
                  text-center
                  text-[14px]
                  leading-[1.8]
                  text-[#07517b]

                  sm:text-[15px]

                  md:text-[16px]

                  lg:mx-0
                  lg:text-left
                  lg:text-[16px]

                  xl:text-[18px]
                  xl:leading-[1.9]

                  2xl:text-[19px]
                "
              >
                Dreaming of studying, working,
                travelling, or building a future
                abroad? Growmore Global Visa is here
                to make your journey simpler, clearer,
                and more confident. From student and
                work visas to dependent, visitor and
                migration services, we provide
                personalised guidance and end-to-end
                support across multiple countries.
                <b>
                  Your dream destination is closer
                  than you think. Let’s take the first
                  step together.
                </b>
              </p>

              {/* KNOW MORE */}

              <div
                className="
                  flex
                  justify-center

                  lg:justify-start
                "
              >
                <Link to="/who-we-are">
                  <button
                    type="button"
                    className="
                      mt-7
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      bg-[#5bb1d0]
                      px-7
                      py-3.5
                      text-[15px]
                      font-semibold
                      text-[#083b63]
                      shadow-sm
                      transition
                      duration-300
                      hover:bg-[#48a3c4]
                      hover:shadow-lg

                      sm:mt-8
                      sm:px-8
                      sm:py-4

                      lg:mt-8

                      xl:mt-10
                      xl:px-10
                      xl:py-5
                      xl:text-[17px]

                      2xl:mt-12
                      2xl:px-11
                      2xl:py-5
                      2xl:text-[18px]
                    "
                  >
                    Know More

                    <ArrowRight
                      size={20}
                      className="
                        lg:h-[21px]
                        lg:w-[21px]

                        xl:h-[22px]
                        xl:w-[22px]
                      "
                    />
                  </button>
                </Link>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE
                ================================================= */}

            <div
              className="
                relative
                flex
                min-h-0
                w-full
                flex-col
                items-center
                justify-center

                lg:min-h-[680px]

                xl:min-h-[720px]
                xl:flex-row

                2xl:min-h-[800px]
              "
            >
              {/* =================================================
                  DECORATIVE ARC
                  ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-[3%]
                  top-[15%]
                  z-10
                  hidden
                  h-[280px]
                  w-[420px]
                  rounded-[50%]
                  border-t
                  border-dashed
                  border-[#54b79c]
                  opacity-80
                  rotate-[-8deg]

                  lg:block

                  xl:left-[5%]
                  xl:h-[300px]
                  xl:w-[450px]

                  2xl:h-[400px]
                  2xl:w-[600px]
                "
              />

              {/* =================================================
                  HERO IMAGE
                  ================================================= */}

              <div
                className="
                  relative
                  z-0
                  w-full

                  max-w-[560px]

                  sm:max-w-[620px]

                  md:max-w-[680px]

                  lg:max-w-[650px]
                  lg:-ml-6

                  xl:max-w-[850px]
                  xl:-ml-10

                  2xl:max-w-[950px]
                  2xl:-ml-16
                "
              >
                <img
                  src={heroImage}
                  alt="Global destinations"
                  className="
                    h-[380px]
                    w-full
                    object-contain

                    sm:h-[430px]

                    md:h-[500px]

                    lg:h-[600px]

                    xl:h-[780px]

                    2xl:h-[900px]
                  "
                />
              </div>

              {/* =================================================
                  CONSULTATION FORM
                  ================================================= */}

              <div
                className="
                  relative
                  z-30
                  mt-[-20px]
                  mb-12
                  w-full
                  max-w-[500px]
                  rounded-[20px]
                  bg-[#FFFFFFE8]
                  px-4
                  py-5
                  shadow-[0_0_24px_4px_#B2AFAF40]
                  backdrop-blur-[4px]

                  sm:px-5

                  md:max-w-[550px]
                  md:px-6

                  lg:absolute
                  lg:left-[140px]
                  lg:right-0
                  lg:top-[80px]
                  lg:mt-0
                  lg:mb-0
                  lg:h-[580px]
                  lg:w-[380px]
                  lg:max-w-none
                  lg:px-[20px]
                  lg:py-[22px]
                  lg:bg-[#FFFFFFA8]
                  lg:opacity-90

                  xl:left-[280px]
                  xl:top-20
                  xl:h-[640px]
                  xl:w-[440px]
                  xl:px-[24px]
                  xl:py-[25px]

                  2xl:left-[500px]
                  2xl:top-20
                  2xl:h-[640px]
                  2xl:w-[480px]
                  2xl:px-[28px]
                  2xl:py-[28px]
                "
              >
                {/* FORM HEADER */}

                <div
                  className="
                    mb-4
                    text-center

                    sm:mb-5

                    lg:mb-5

                    xl:mb-6

                    2xl:mb-7
                  "
                >
                  <p
                    className="
                      text-[14px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-[#026CC0]

                      sm:text-[15px]

                      lg:text-[16px]

                      xl:text-[17px]

                      2xl:text-[18px]
                    "
                  >
                    SPEAK WITH US
                  </p>

                  <h2
                    className="
                      mt-1
                      text-[22px]
                      font-semibold
                      text-[#1A4780]

                      sm:text-[24px]

                      lg:text-[25px]

                      xl:text-[28px]

                      2xl:text-[30px]
                    "
                  >
                    Book A Consultation
                  </h2>
                </div>

                {/* =================================================
                    FORM
                    ================================================= */}

                <form
                  onSubmit={handleSubmit}
                  className="
                    space-y-3

                    lg:space-y-3

                    xl:space-y-4
                  "
                >
                  {/* NAME + EMAIL */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-2

                      sm:grid-cols-2

                      lg:gap-2

                      xl:gap-3
                    "
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="
                        h-[36px]
                        w-full
                        rounded-[9px]
                        border
                        border-[#e0e4e8]
                        bg-white
                        px-4
                        text-[12px]
                        text-[#333]
                        outline-none
                        transition
                        placeholder:text-[#026CC0]
                        focus:border-[#69b99e]

                        lg:h-[40px]

                        xl:h-[42px]
                        xl:text-[13px]

                        2xl:h-[45px]
                        2xl:text-[14px]
                      "
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="
                        h-[36px]
                        w-full
                        rounded-[9px]
                        border
                        border-[#e0e4e8]
                        bg-white
                        px-4
                        text-[12px]
                        text-[#333]
                        outline-none
                        transition
                        placeholder:text-[#026CC0]
                        focus:border-[#69b99e]

                        lg:h-[40px]

                        xl:h-[42px]
                        xl:text-[13px]

                        2xl:h-[45px]
                        2xl:text-[14px]
                      "
                    />
                  </div>

                  {/* PHONE */}

                  <div className="flex w-full gap-2">
                    <div
                      className="
                        h-[36px]
                        w-[115px]
                        shrink-0
                        rounded-[9px]
                        border
                        border-[#e0e4e8]
                        bg-white

                        sm:w-[120px]

                        lg:h-[40px]
                        lg:w-[125px]

                        xl:h-[42px]
                        xl:w-[135px]

                        2xl:h-[45px]
                        2xl:w-[145px]
                      "
                    >
                      <CountrySelect
                        value={formData.phoneCountry}
                        onChange={
                          handlePhoneCountryChange
                        }
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <PhoneInput
                        country={
                          formData.phoneCountry
                        }
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="Contact Number"
                        required
                        className="
                          phone-number-input
                          h-[36px]
                          w-full
                          rounded-[9px]
                          border
                          border-[#e0e4e8]
                          bg-white
                          px-4
                          text-[12px]
                          text-[#333]
                          outline-none
                          transition
                          placeholder:text-[#026CC0]
                          focus:border-[#69b99e]

                          lg:h-[40px]

                          xl:h-[42px]
                          xl:text-[13px]

                          2xl:h-[45px]
                          2xl:text-[14px]
                        "
                      />
                    </div>
                  </div>

                  {/* INQUIRY */}

                  <div className="relative">
                    <select
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                      required
                      className="
                        h-[36px]
                        w-full
                        appearance-none
                        rounded-[9px]
                        border
                        border-[#e0e4e8]
                        bg-white
                        px-4
                        text-[13px]
                        text-[#026CC0]
                        outline-none
                        focus:border-[#69b99e]

                        sm:text-[14px]

                        lg:h-[40px]

                        xl:h-[42px]

                        2xl:h-[45px]
                        2xl:text-[15px]
                      "
                    >
                      <option value="">
                        Inquiry for
                      </option>

                      <option value="Student Visa">
                        Student Visa
                      </option>

                      <option value="Work Visa">
                        Work Visa
                      </option>

                      <option value="Visitor Visa">
                        Visitor Visa
                      </option>

                      <option value="Migration">
                        Migration
                      </option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-[#34506d]

                        xl:h-[18px]
                        xl:w-[18px]
                      "
                    />
                  </div>

                  {/* COUNTRY */}

                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="
                        h-[36px]
                        w-full
                        appearance-none
                        rounded-[9px]
                        border
                        border-[#e0e4e8]
                        bg-white
                        px-4
                        text-[12px]
                        text-[#026CC0]
                        outline-none
                        focus:border-[#69b99e]

                        lg:h-[40px]

                        xl:h-[42px]
                        xl:text-[14px]

                        2xl:h-[45px]
                        2xl:text-[15px]
                      "
                    >
                      <option value="">
                        Country
                      </option>

                      <option value="Australia">
                        Australia
                      </option>

                      <option value="New Zealand">
                        New Zealand
                      </option>

                      <option value="Singapore">
                        Singapore
                      </option>

                      <option value="Canada">
                        Canada
                      </option>

                      <option value="United Kingdom">
                        United Kingdom
                      </option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-[#34506d]

                        xl:h-[18px]
                        xl:w-[18px]
                      "
                    />
                  </div>

                  {/* COMMENTS */}

                  <textarea
                    name="comments"
                    placeholder="Your Comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows="2"
                    className="
                      min-h-[70px]
                      w-full
                      resize-none
                      rounded-[10px]
                      border
                      border-[#e0e4e8]
                      bg-white
                      px-4
                      py-3
                      text-[12px]
                      text-[#333]
                      outline-none
                      placeholder:text-[#026CC0]
                      focus:border-[#69b99e]

                      sm:min-h-[75px]

                      lg:min-h-[85px]

                      xl:min-h-[100px]
                      xl:text-[13px]

                      2xl:min-h-[110px]
                      2xl:text-[14px]
                    "
                  />

                  {/* RECAPTCHA */}

                  <div
                    className="
                      flex
                      justify-center

                      sm:justify-start

                      lg:pt-1

                      xl:pt-1
                    "
                  >
                    <ReCAPTCHA
                      sitekey={
                        "6LdQnKYtAAAAAJkOhWSSnhScrzUBMtq-k_REKsc3"
                      }
                      ref={recaptchaRef}
                    />
                  </div>

                  {/* STATUS MESSAGE */}

                  {statusMessage.text && (
                    <div
                      className={`
                        rounded-md
                        p-2
                        text-center
                        text-[12px]
                        font-medium

                        lg:text-[12px]

                        xl:text-[13px]

                        ${
                          statusMessage.type ===
                          "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {statusMessage.text}
                    </div>
                  )}

                  {/* SUBMIT BUTTON */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      mx-auto
                      mt-[-4px]
                      flex
                      h-[42px]
                      w-[140px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#214c83]
                      text-[14px]
                      font-semibold
                      text-white
                      transition
                      hover:bg-[#163d70]
                      disabled:cursor-not-allowed
                      disabled:opacity-50

                      sm:h-[45px]
                      sm:w-[150px]

                      lg:mt-1
                      lg:h-[46px]
                      lg:w-[155px]

                      xl:h-[50px]
                      xl:w-[175px]
                      xl:text-[15px]

                      2xl:h-[54px]
                      2xl:w-[190px]
                      2xl:text-[16px]
                    "
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;