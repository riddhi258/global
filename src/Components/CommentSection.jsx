import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function CommentSection() {
  const recaptchaRef = useRef(null);
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Capture the token when the user completes the captcha
  const onCaptchaChange = (value) => {
    setToken(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please verify that you are not a robot.");
      return;
    }

    const payload = { ...formData, captchaToken: token };

    try {
      console.log("Submitting:", payload);
      // Your fetch logic here
      alert("Comment posted successfully!");

      // Reset
      setFormData({ fullName: "", phone: "", email: "", message: "" });
      setToken(null);
      recaptchaRef.current.reset();
    } catch {
      alert("Submission error. Please try again.");
    }
  };

  const pageUrl = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Check this out!");

  return (
    <div className="bg-white flex flex-col items-start px-4 py-10 mb-20">
      <div className="w-full max-w-5xl border-t border-gray-300 pt-8">
        {/* Social Sharing */}
        <div className="flex justify-end gap-6 mb-6 text-gray-600 text-xl">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
            target="_blank"
            className="hover:text-blue-600"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
            target="_blank"
            
            className="hover:text-blue-700"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${pageUrl}`}
            target="_blank"
            
            className="hover:text-green-500"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href={`https://t.me/share/url?url=${pageUrl}&text=${text}`}
            target="_blank"
            
            className="hover:text-blue-700"
          >
            <i className="fab fa-telegram-plane"></i>
          </a>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${pageUrl}`}
            target="_blank"
            
            className="hover:text-green-500"
          >
            {" "}
            <i className="fab fa-pinterest-p"></i>
          </a>
        </div>

        {/* Comment Form Card */}
        <div className="w-full lg:w-2/3 bg-[#E6EBDD] rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#1E3A3A] mb-4">
            Add a comment
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="px-4 py-2 rounded-full bg-white border-none outline-none"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="px-4 py-2 rounded-full border-none bg-white outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="px-4 py-2 rounded-full border-none  bg-white outline-none"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows="4"
              required
              className="w-full px-4 py-3 bg-white rounded-xl border-none outline-none"
            />

            <div className="py-2">
              <ReCAPTCHA
                sitekey={"6LdQnKYtAAAAAJkOhWSSnhScrzUBMtq-k_REKsc3"}
                ref={recaptchaRef}
                onChange={onCaptchaChange}
              />
            </div>

            <button
              type="submit"
              className="bg-[#2E2E2E] text-white px-8 py-3 rounded-full hover:bg-black transition font-bold"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
