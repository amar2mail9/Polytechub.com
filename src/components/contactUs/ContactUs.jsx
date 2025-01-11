import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";
import { send } from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    to_name: "Recipient Name", // Example: Admin name
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Replace with your EmailJS details
    const SERVICE_ID = "service_st7v1ws";
    const TEMPLATE_ID = "template_qoyzydr";
    const PUBLIC_KEY = "2BVmc3qqScJZE395s";

    send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then((response) => {
        setSubmitted(true);
        toast.success("Message sent successfully!");
        console.log("Email sent:", response);

        // Reset form
        setFormData({
          to_name: "Recipient Name",
          from_name: "",
          from_email: "",
          subject: "",
          message: "",
        });
        setSending(false);
      })
      .catch((error) => {
        toast.error("Failed to send message. Please try again.");
        console.error("Email send error:", error);
        setSending(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
          <ToastContainer />

          <motion.div
            className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="bg-blue-600 text-white text-center py-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold">Contact Us</h1>
              <p className="text-lg mt-2">We'd love to hear from you!</p>
            </motion.div>

            <div className="p-6 sm:p-10">
              {submitted ? (
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-semibold text-green-600">
                    Thank you for reaching out!
                  </h2>
                  <p className="text-gray-600 mt-4">
                    We'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {/* Name Field */}
                  <motion.div>
                    <label
                      htmlFor="from_name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      id="from_name"
                      placeholder="Enter your name"
                      value={formData.from_name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div>
                    <label
                      htmlFor="from_email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      id="from_email"
                      placeholder="Enter your email"
                      value={formData.from_email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div className="col-span-1 sm:col-span-2">
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Enter the subject of your message"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div className="col-span-1 sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div className="col-span-1 sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className={`bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition ${
                        sending ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Submit"}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </Layout>
    </>
  );
}
