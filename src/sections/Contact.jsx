import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import emailjs from "@emailjs/browser";

/* ✅ FIXED CONTACT LINKS */
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sk1635050@gmail.com",
    href: "mailto:sk1635050@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 63910 56492",
    href: "tel:+916391056492",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Uttar Pradesh, India",
    href: "https://www.google.com/maps/search/?api=1&query=Uttar+Pradesh+India",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* LEFT FORM */}
        <div className="glass p-8 rounded-3xl border">
          <h2 className="text-3xl font-bold mb-6">Send Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label>Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border mt-2"
              />
            </div>

            {/* Email */}
            <div>
              <label>Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border mt-2"
              />
            </div>

            {/* Message */}
            <div>
              <label>Message</label>
              <textarea
                rows="5"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-xl border mt-2 resize-none"
              />
            </div>

            {/* Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4 ml-2" />
            </Button>

            {/* Status */}
            {submitStatus.type && (
              <div
                className={`flex items-center gap-2 text-sm ${
                  submitStatus.type === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>

        {/* RIGHT CONTACT INFO */}
        <div className="space-y-6">

          <div className="glass p-8 rounded-3xl border">
            <h2 className="text-2xl font-bold mb-6">
              Contact Information
            </h2>

            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="glass p-8 rounded-3xl border">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-semibold">
                Currently Available
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Available for jobs, freelance work, and new projects.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};