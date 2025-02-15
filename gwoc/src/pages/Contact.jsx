import { useState } from "react";
import { Send, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const adminPhoneNumber = "9461458024";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    
    const whatsappMessage = `Hello,my name is ${name}. My email is ${email}, and my phone number is ${phone}. Here is my query: ${message}`;
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section 
      className="min-h-screen py-12 text-[#3F4F44] flex items-center justify-center"
      style={{
        backgroundImage: "url('https://www.kapaaha.com/catalog/view/theme/default/images/bg_repeat.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-full max-w-xl"
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <motion.h2 
                className="mb-2 text-4xl font-bold text-[#3F4F44]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Let's Connect
              </motion.h2>
              <motion.p 
                className="text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </motion.p>
            </div>
            <motion.div 
              className="space-y-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              initial="hidden"
              animate="show"
            >
              <ContactInfo icon={<Phone className="h-6 w-6" />} title="Phone" details={adminPhoneNumber} />
              <ContactInfo icon={<Mail className="h-6 w-6" />} title="Email" details="admin@yourdomain.com" />
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full max-w-xl"
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div 
              className="overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 bg-opacity-90"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ContactForm 
                name={name} setName={setName}
                email={email} setEmail={setEmail}
                phone={phone} setPhone={setPhone}
                message={message} setMessage={setMessage}
                handleSubmit={handleSubmit}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, title, details }) => (
  <div className="flex items-center gap-4">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-[#3F4F44]">
      {icon}
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p>{details}</p>
    </div>
  </div>
);

const ContactForm = ({ name, setName, email, setEmail, phone, setPhone, message, setMessage, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="space-y-6">
    <InputField type="text" label="Name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
    <InputField type="email" label="Email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
    <InputField type="tel" label="Phone" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
    <TextareaField label="Message" placeholder="Your message here..." value={message} onChange={(e) => setMessage(e.target.value)} />
    <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#3F4F44] px-6 py-3 text-white hover:opacity-90">
      <Send className="h-5 w-5" /> Send Message via WhatsApp
    </button>
  </form>
);

const InputField = ({ type, label, placeholder, value, onChange }) => (
  <div>
    <label className="mb-2 block text-sm font-medium">{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#3F4F44] focus:ring-[#3F4F44]" />
  </div>
);

const TextareaField = ({ label, placeholder, value, onChange }) => (
  <div>
    <label className="mb-2 block text-sm font-medium">{label}</label>
    <textarea rows="4" placeholder={placeholder} value={value} onChange={onChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#3F4F44] focus:ring-[#3F4F44]" />
  </div>
);

export default Contact;