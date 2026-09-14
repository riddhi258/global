import img from "../assets/img20.png";
import { useState, useRef } from "react";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";

import PhoneInput from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import ReCAPTCHA from "react-google-recaptcha";
import { ChevronDown } from "lucide-react";
import {
  ToastContainer,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* =========================================================
   COUNTRY SELECT
   ========================================================= */

const CountrySelect = ({ value, onChange }) => {
  
  const countries = getCountries();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-[36px] w-full rounded-[9px] border border-[#e0e4e8] bg-white px-2 text-[12px] text-[#026CC0] outline-none focus:border-[#69b99e]"
    >
      {countries.map((country) => (
        <option key={country} value={country}>
          {en[country] || country}
        </option>
      ))}
    </select>
  );
};

/* =========================================================
    COMPONENT
   ========================================================= */

const Contact = () => {
  const recaptchaRef = useRef(null);

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
  const [captchaToken, setCaptchaToken] = useState("");
  const [statusMessage, setStatusMessage] = useState({
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
     CAPTCHA
     ========================================================= */

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token || "");

    if (token) {
      setStatusMessage({
        type: "",
        text: "",
      });
    }
  };

  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setStatusMessage({
      type: "",
      text: "",
    });

    /* -------------------------
       VALIDATION
       ------------------------- */

    const requiredFields = [
      {
        name: "name",
        label: "Name",
      },
      {
        name: "email",
        label: "Email",
      },
      {
        name: "phone",
        label: "Phone number",
      },
      {
        name: "inquiry",
        label: "Inquiry type",
      },
      {
        name: "country",
        label: "Destination country",
      },
    ];

    const missingField = requiredFields.find(
      ({ name }) => !String(formData[name] || "").trim()
    );

    if (missingField) {
      const message = `${missingField.label} is required.`;

      setStatusMessage({
        type: "error",
        text: message,
      });

      toast.error(message);

      return;
    }

    /* -------------------------
       EMAIL VALIDATION
       ------------------------- */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      const message = "Please enter a valid email address.";

      setStatusMessage({
        type: "error",
        text: message,
      });

      toast.error(message);

      return;
    }

    /* -------------------------
       CAPTCHA VALIDATION
       ------------------------- */

    if (!captchaToken) {
      const message =
        "Please verify the captcha before submitting.";

      setStatusMessage({
        type: "error",
        text: message,
      });

      toast.warning(message);

      return;
    }

    /* -------------------------
       START SUBMISSION
       ------------------------- */

    setIsSubmitting(true);

    try {
      /* -------------------------
         PHONE NUMBER
         ------------------------- */

      const callingCode = getCountryCallingCode(
        formData.phoneCountry
      );

      let phoneNumber = formData.phone || "";

      // Remove existing country code if PhoneInput
      // has already included it.
      phoneNumber = phoneNumber.replace(
        `+${callingCode}`,
        ""
      );

      const fullPhoneNumber = `+${callingCode}${phoneNumber}`;

      /* -------------------------
         API PAYLOAD
         ------------------------- */

      const payload = {
        name: formData.name.trim(),

        email: formData.email.trim(),

        phone: fullPhoneNumber,

        visaType:
          formData.inquiry || "General Inquiry",

        message:
          `[Destination Country: ${
            formData.country || "Not Specified"
          }] ${formData.comments || ""}`.trim(),

        captchaToken: captchaToken,

        source: "Website Hero Form",
      };

      console.log(
        "Submitting lead:",
        payload
      );

      /* -------------------------
         API REQUEST
         ------------------------- */

      const apiBaseUrl =
        "https://global-murex.vercel.app";

      const response = await fetch(
        `${apiBaseUrl}/api/lead`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const responseText =
        await response.text();

      console.log(
        "API status:",
        response.status
      );

      console.log(
        "API response:",
        responseText
      );

      let result = {};

      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch (error) {
          console.error(
            "Invalid JSON response:",
            error
          );

          const invalidJsonError = new Error(
            "The server returned an invalid response. Please try again later."
          );
          invalidJsonError.cause = error;
          throw invalidJsonError;
        }
      }

      /* -------------------------
         SUCCESS
         ------------------------- */

      if (
        response.ok &&
        result.success
      ) {
        const successMessage =
          result.message ||
          "Thank you! Our team will contact you shortly.";

        setStatusMessage({
          type: "success",
          text: successMessage,
        });

        toast.success(successMessage);

        /* Reset form */
        setFormData(initialFormData);

        /* Reset CAPTCHA */
        setCaptchaToken("");
      } else {
        const errorMessage =
          result.message ||
          result.error ||
          `Server error: ${response.status}`;

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(
        "Form Submission Error:",
        error
      );

      const errorMessage =
        error?.message ||
        "An error occurred while submitting your request. Please try again later.";

      setStatusMessage({
        type: "error",
        text: errorMessage,
      });

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     JSX
     ========================================================= */

  return (
    <>
      <div
        className="w-full h-[727px] mt-2"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="w-[456px] h-[21px] text-[30px] font-bold text-teal-800 ml-160 pt-12">
          Get In Touch With Us
        </p>

        {/* FORM */}
        <div
          className="w-[456px] h-[460px] rounded-[20px] p-[30px] gap-[16px] mt-20 ml-140"
          style={{
            backgroundColor: "#FFFFFFA8",
            boxShadow:
              "0px 0px 24px 4px #B2AFAF40",
            backdropFilter: "blur(4px)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-3"
          >
            {/* NAME + EMAIL */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="h-[36px] w-full rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[12px] text-[#333] outline-none transition placeholder:text-[#026CC0] focus:border-[#69b99e]"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="h-[36px] w-full rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[12px] text-[#333] outline-none transition placeholder:text-[#026CC0] focus:border-[#69b99e]"
              />
            </div>

            {/* PHONE */}
            <div className="flex w-full gap-2">
              <div className="h-[36px] w-[115px] shrink-0 rounded-[9px] border border-[#e0e4e8] bg-white sm:w-[120px]">
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
                  onChange={
                    handlePhoneChange
                  }
                  placeholder="Contact Number"
                  className="phone-number-input h-[36px] w-full rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[12px] text-[#333] outline-none transition placeholder:text-[#026CC0] focus:border-[#69b99e]"
                />
              </div>
            </div>

            {/* INQUIRY */}
            <div className="relative">
              <select
                name="inquiry"
                value={formData.inquiry}
                onChange={handleChange}
                className="h-[36px] w-full appearance-none rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[13px] text-[#026CC0] outline-none focus:border-[#69b99e] sm:text-[14px]"
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
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#34506d]"
              />
            </div>

            {/* COUNTRY */}
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="h-[36px] w-full appearance-none rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[12px] text-[#026CC0] outline-none focus:border-[#69b99e]"
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
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#34506d]"
              />
            </div>

            {/* COMMENTS */}
            <textarea
              name="comments"
              placeholder="Your Comments"
              value={formData.comments}
              onChange={handleChange}
              rows="2"
              className="min-h-[70px] w-full resize-none rounded-[10px] border border-[#e0e4e8] bg-white px-4 py-3 text-[12px] text-[#333] outline-none placeholder:text-[#026CC0] focus:border-[#69b99e] sm:min-h-[75px]"
            />

            {/* RECAPTCHA */}
            <div className="flex justify-center sm:justify-start">
              <ReCAPTCHA
                sitekey={"6LdQnKYtAAAAAJkOhWSSnhScrzUBMtq-k_REKsc3"}
                ref={recaptchaRef}
                onChange={handleCaptchaChange}
                onExpired={() => {
                  setCaptchaToken("");
                }}
              />
            </div>

            {/* STATUS */}
            {statusMessage.text && (
              <div
                className={`text-center text-[12px] font-medium p-2 rounded-md ${
                  statusMessage.type ===
                  "success"
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
              className="mx-auto mt-[-4px] flex h-[42px] w-[140px] items-center justify-center rounded-full bg-[#214c83] text-[14px] font-semibold text-white transition hover:bg-[#163d70] disabled:cursor-not-allowed disabled:opacity-50 sm:h-[45px] sm:w-[150px] xl:mt-[-6px]"
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* TOAST CONTAINER */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default Contact;