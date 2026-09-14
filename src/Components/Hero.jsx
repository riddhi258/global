import { useState, useRef } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";

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

        <ChevronDown size={14} className="ml-auto shrink-0 text-[#34506d]" />
      </div>
    </div>
  );
};

/* =========================================================
   HERO COMPONENT
   ========================================================= */

const Hero = () => {
  const recaptchaRef = useRef(null);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    phoneCountry: "IN",
    inquiry: "",
    country: "",
    comments: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

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
    setStatusMessage({ type: "", text: "" });

    // Basic client-side validation before sending
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Please fill in your name, email and contact number.");
      return;
    }

    if (!formData.inquiry.trim() || !formData.country.trim()) {
      toast.error("Please select an inquiry type and destination country.");
      return;
    }

    // 1. Validate reCAPTCHA
    const captchaToken = recaptchaRef.current
      ? recaptchaRef.current.getValue()
      : null;

    if (recaptchaSiteKey && !captchaToken) {
      toast.warn("Please verify the captcha");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone to include full country dial code
      const callingCode = getCountryCallingCode(formData.phoneCountry);
      const fullPhoneNumber = formData.phone
        ? `+${callingCode}${formData.phone.replace(`+${callingCode}`, "")}`
        : "";

      // 2. Map form data to the lead API requirements
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: fullPhoneNumber,
        visaType: formData.inquiry || "General Inquiry",
        message:
          `[Destination Country: ${formData.country || "Not Specified"}] ${
            formData.comments
          }`.trim(),
        captchaToken,
        source: "Website Hero Form",
      };

      const apiBaseUrl = "https://global-murex.vercel.app";
      const response = await fetch(`${apiBaseUrl}/api/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Read the response as text first so an empty or non-JSON response does
      // not throw "Unexpected end of JSON input".
      const responseText = await response.text();
      let result = {};

      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(
            "The server returned an invalid response. Please try again later.",
          );
        }
      }

      if (response.ok && result.success) {
        const successMessage =
          result.message || "Thank you! Our team will contact you shortly.";
        toast.success(successMessage);
        setStatusMessage({ type: "success", text: successMessage });

        // Reset form & captcha on success
        setFormData(initialFormData);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        const errorMsg =
          result.message || result.error || `Server error: ${response.status}`;
        toast.error(errorMsg);
        setStatusMessage({ type: "error", text: errorMsg });
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error("Form Submission Error:", err);
      const message =
        err.message ||
        "An error occurred while submitting your request. Please try again later.";
      toast.error(message);
      setStatusMessage({ type: "error", text: message });
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
          "
        />

        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
            px-5
            sm:px-6
            md:px-8
            lg:px-10
            xl:px-16
          "
        >
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
              lg:gap-16
              xl:min-h-[550px]
              xl:grid-cols-[46%_54%]
              xl:gap-0
            "
          >
            {/* LEFT CONTENT */}
            <div
              className="
                relative
                z-20
                py-12
                sm:py-14
                md:py-16
                lg:py-18
                xl:py-24
              "
            >
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
                  lg:text-left
                  lg:text-[22px]
                  xl:mt-[-10px]
                  xl:mb-6
                  xl:text-[23px]
                "
              >
                Welcome to Growmore Global Visa
              </p>

              <h1
                className="
                  max-w-[650px]
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
                  lg:text-[40px]
                  xl:text-[40px]
                "
              >
                Your Global Journey
                <br />
                Starts Here
              </h1>

              <div
                className="
                  mx-auto
                  my-5
                  h-[3px]
                  w-[92px]
                  bg-[#78cba8]
                  sm:my-6
                  lg:mx-0
                  xl:my-6
                "
              />

              <p
                className="
                  mx-auto
                  max-w-[610px]
                  text-center
                  text-[14px]
                  leading-[1.8]
                  text-[#07517b]
                  sm:text-[15px]
                  md:text-[16px]
                  lg:mx-0
                  lg:text-left
                  xl:text-[16px]
                "
              >
                Dreaming of studying, working, travelling, or building a future
                abroad? Growmore Global Visa is here to make your journey
                simpler, clearer, and more confident. From student and work
                visas to dependent, visitor and migration services, we provide
                personalised guidance and end-to-end support across multiple
                countries.<b>Your dream destination is closer than you think.
                Let’s take the first step together.</b>
              </p>

              <div className="flex justify-center lg:justify-start">
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
                    "
                  >
                    Know More
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div
              className="
                relative
                flex
                min-h-0
                w-full
                flex-col
                items-center
                justify-center
                lg:min-h-[700px]
                xl:min-h-[650px]
                xl:flex
                xl:flex-row
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  left-[5%]
                  top-[15%]
                  z-10
                  hidden
                  h-[300px]
                  w-[450px]
                  rounded-[50%]
                  border-t
                  border-dashed
                  border-[#54b79c]
                  opacity-80
                  rotate-[-8deg]
                  xl:block
                "
              />

              {/* HERO IMAGE */}
              <div
                className="
                  relative
                  z-0
                  w-full
                  max-w-[560px]
                  sm:max-w-[620px]
                  md:max-w-[680px]
                  lg:max-w-[720px]
                  xl:max-w-[700px]
                  xl:-ml-10
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
                    lg:h-[560px]
                    xl:h-[750px]
                  "
                />
              </div>

              {/* CONSULTATION FORM */}
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
                  lg:max-w-[600px]
                  xl:absolute
                  xl:left-[380px]
                  xl:right-0
                  xl:top-32
                  xl:mt-0
                  xl:mb-0
                  xl:h-[525px]
                  xl:w-[380px]
                  xl:max-w-none
                  xl:px-[19px]
                  xl:py-[20px]
                  xl:bg-[#FFFFFFA8]
                  xl:opacity-90
                "
              >
                <div className="mb-4 text-center sm:mb-5">
                  <p
                    className="
                      text-[14px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-[#026CC0]
                      sm:text-[15px]
                      lg:text-[16px]
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
                      xl:text-[25px]
                    "
                  >
                    Book A Consultation
                  </h2>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* NAME + EMAIL */}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                      "
                    />
                  </div>

                  {/* PHONE */}
                  <div className="flex w-full gap-2">
                    <div className="h-[36px] w-[115px] shrink-0 rounded-[9px] border border-[#e0e4e8] bg-white sm:w-[120px]">
                      <CountrySelect
                        value={formData.phoneCountry}
                        onChange={handlePhoneCountryChange}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <PhoneInput
                        country={formData.phoneCountry}
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
                      "
                    >
                      <option value="">Inquiry for</option>
                      <option value="Student Visa">Student Visa</option>
                      <option value="Work Visa">Work Visa</option>
                      <option value="Visitor Visa">Visitor Visa</option>
                      <option value="Migration">Migration</option>
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
                      "
                    >
                      <option value="">Country</option>
                      <option value="Australia">Australia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
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
                    "
                  />

                  {/* RECAPTCHA */}
                  <div className="flex justify-center sm:justify-start">
                    <ReCAPTCHA
                      sitekey={"6LdQnKYtAAAAAJkOhWSSnhScrzUBMtq-k_REKsc3"}
                      ref={recaptchaRef}
                    />
                  </div>

                  {/* STATUS NOTIFICATION */}
                  {statusMessage.text && (
                    <div
                      className={`text-center text-[12px] font-medium p-2 rounded-md ${
                        statusMessage.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
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
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      sm:h-[45px]
                      sm:w-[150px]
                      xl:mt-[-6px]
                    "
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
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
