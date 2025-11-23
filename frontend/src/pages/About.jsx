import React from "react";
import Footer from "../components/home/Footer";
import aboutImg from "../assets/images/about.avif";

const About = () => {
  return (
    <div className="pt-28 min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="text-center mb-12 px-4">
        <h1 className="!text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-3">
          About Us
        </h1>
        <p className="text-[var(--text-secondary)] text-base md:text-md max-w-2xl mx-auto">
          ShopEase is dedicated to providing the best shopping experience for
          our customers. Learn more about our mission, values, and team below.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 px-4 items-center mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Our Mission
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-md">
            We aim to simplify online shopping by offering a wide range of
            products at competitive prices with excellent customer service. Our
            goal is to make shopping convenient, enjoyable, and trustworthy for
            everyone.
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-6">
            Our Values
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-md">
            Customer-first approach, quality assurance, integrity in business,
            and innovation in everything we do. These values guide our daily
            operations and decision-making.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={aboutImg}
            alt="About Illustration"
            className="rounded-2xl shadow-lg w-full md:w-96 border border-[var(--border-color)]"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 px-4 pb-16">
        {[
          {
            title: "Fast Delivery",
            desc: "Quick and reliable shipping for all orders.",
          },
          {
            title: "Secure Payment",
            desc: "Safe and convenient payment methods.",
          },
          {
            title: "Customer Support",
            desc: "24/7 support for all your needs.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg rounded-2xl p-6 text-center"
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {item.title}
            </h3>
            <p className="text-[var(--text-secondary)] text-sm md:text-base">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default About;
