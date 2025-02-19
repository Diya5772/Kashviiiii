import React from "react";
import { MapPin, Mail, Phone, Clock, Store } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.2 },
};

const AboutUs = () => {
  return (
    <div
      className="bg-white"
      style={{
        backgroundImage:
          "url('https://zaribanaras.com/cdn/shop/files/explore-mystical-bg.png?v=1613121202')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar/>
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className=" mt-24 mb-4 text-5xl font-bold text-[#2C3930] hover:scale-105 transition-transform font-serif  leading-tight duration-300">
            Kashvi Creation
          </h1>
          <p className="text-xl text-[#2C3930]">
            Premium Saree Manufacturer & Wholesaler
          </p>
        </motion.div>

        {/* Story & Mission Section */}
        <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="space-y-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div
              className="group overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100 hover:shadow-2xl transition-shadow duration-300"
              variants={fadeIn}
            >
              <h2 className="mb-4 text-3xl font-bold text-[#2C3930]">Our Story</h2>
              <p className="text-lg leading-relaxed text-[#2C3930]">
                Established in [Year], Kashvi Creation has been a pioneer in crafting
                exquisite sarees that blend tradition with modern elegance. With a
                commitment to quality, we bring you a wide range of handwoven and
                designer sarees, perfect for every occasion.
              </p>
            </motion.div>

            <motion.div
              className="group overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100 hover:shadow-2xl transition-shadow duration-300"
              variants={fadeIn}
            >
              <h2 className="mb-4 text-3xl font-bold text-[#2C3930]">Our Mission</h2>
              <p className="text-lg leading-relaxed text-[#2C3930]">
                To redefine ethnic fashion with authentic craftsmanship and premium
                fabrics, making every woman feel special in our sarees.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-2xl shadow-xl group">
              <img
                src="https://i.pinimg.com/736x/7f/55/1e/7f551eb144559ddc1ce1529891e4c999.jpg"
                alt="Kashvi Creation Sarees"
                className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </motion.div>
        </div>

        {/* Contact & Location Section */}
        <motion.div
          className="grid gap-8 lg:grid-cols-2"
          variants={staggerChildren}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-6" variants={fadeIn}>
            <h2 className="text-3xl font-bold text-[#2C3930]">Contact Information</h2>
            <div className="space-y-4">
              <ContactInfo icon={<MapPin />} title="Address" details="123 Silk Street, Surat, Gujarat, India" />
              <ContactInfo icon={<Mail />} title="Email" details="contact@kashvicreation.com" />
              <ContactInfo icon={<Phone />} title="Phone" details="+91 98765 43210" />
            </div>
          </motion.div>

          <motion.div className="space-y-6" variants={fadeIn}>
            <h2 className="text-3xl font-bold text-[#2C3930]">Shop Location</h2>
            <div className="space-y-4">
              <ContactInfo icon={<Store />} title="Shop Name" details="Kashvi Sarees" />
              <ContactInfo icon={<Clock />} title="Category" details="Women's Clothing Store" />
              <ContactInfo icon={<MapPin />} title="Shop Address" details="Shop no. Z-1201, Surat Textile Market, Ring Road, Surat, Gujarat, India" />
            </div>
          </motion.div>
        </motion.div>

        {/* Maps Section */}
        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-2"
          variants={staggerChildren}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.div className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 hover:shadow-2xl transition-shadow duration-300" variants={fadeIn}>
            <h3 className="mb-4 text-2xl font-bold text-[#2C3930]">Our Location</h3>
            <div className="h-96">
              <iframe className="h-full w-full rounded-lg" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDM-hXKad-_b8T6y77oI1g6Sr1rDMubd9M&q=Surat,Gujarat,India" allowFullScreen loading="lazy"></iframe>
            </div>
          </motion.div>

          <motion.div className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 hover:shadow-2xl transition-shadow duration-300" variants={fadeIn}>
            <h3 className="mb-4 text-2xl font-bold text-[#2C3930]">Shop Location</h3>
            <div className="h-96">
              <iframe className="h-full w-full rounded-lg" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDM-hXKad-_b8T6y77oI1g6Sr1rDMubd9M&q=Shop%20no.%20Z-1201,%20Surat%20Textile%20Market,%20Ring%20Road,%20Surat,%20Gujarat,%20India" allowFullScreen loading="lazy"></iframe>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
};

const ContactInfo = ({ icon, title, details }) => (
  <motion.div className="flex items-start gap-4 group" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2C3930]/10 text-[#2C3930] group-hover:bg-[#2C3930]/20 transition-colors duration-300">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-[#2C3930]">{title}</h4>
      <p className="text-[#2C3930]/80">{details}</p>
    </div>
  </motion.div>
);

export default AboutUs;