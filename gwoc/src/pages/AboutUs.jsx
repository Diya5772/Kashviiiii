import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6 text-gray-800">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600">About Kashvi Creation</h1>
        <p className="text-lg mt-2">Premium Saree Manufacturer & Wholesaler</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* About Content */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Established in [Year], Kashvi Creation has been a pioneer in crafting
            exquisite sarees that blend tradition with modern elegance. With a
            commitment to quality, we bring you a wide range of handwoven and
            designer sarees, perfect for every occasion.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To redefine ethnic fashion with authentic craftsmanship and premium
            fabrics, making every woman feel special in our sarees.
          </p>
        </div>

        {/* Image */}
        <div>
          <img
            src="https://source.unsplash.com/600x400/?saree,traditional"
            alt="Kashvi Creation Sarees"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>

      {/* Contact Details */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Contact Us</h2>
        <p className="text-gray-600"><strong>Address:</strong> 123 Silk Street, Surat, Gujarat, India</p>
        <p className="text-gray-600"><strong>Email:</strong> contact@kashvicreation.com</p>
        <p className="text-gray-600"><strong>Phone:</strong> +91 98765 43210</p>
      </div>

      {/* Google Map */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Location</h2>
        <iframe
          className="w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDM-hXKad-_b8T6y77oI1g6Sr1rDMubd9M&q=Surat,Gujarat,India"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Shop Location */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Shop Location</h2>
        <p className="text-gray-600"><strong>Shop Name:</strong> Kashvi Sarees</p>
        <p className="text-gray-600"><strong>Category:</strong> Women's Clothing Store</p>
        <p className="text-gray-600"><strong>Shop Address:</strong> Shop no. Z-1201, Surat Textile Market, Ring Road, Surat, Gujarat, India</p>
        <iframe
          className="w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDM-hXKad-_b8T6y77oI1g6Sr1rDMubd9M&q=Shop%20no.%20Z-1201,%20Surat%20Textile%20Market,%20Ring%20Road,%20Surat,%20Gujarat,%20India"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutUs;