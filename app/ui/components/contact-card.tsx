"use client";

import Image from "next/image";
import ContactForm from "../forms/contact-form";
import { ImageType } from "../../lib/definitions";
import { motion } from "framer-motion";
import { useState } from "react";
import { dissolveVariants } from "../../lib/animate-context";

export default function ContactCard({
  bgImage,
  bannerImage,
}: {
  bgImage: ImageType;
  bannerImage: ImageType;
}) {
  const [showOnHover, setShowOnHover] = useState<boolean>(false);

  return (
    <section
      onMouseEnter={() => setShowOnHover(true)}
      onMouseLeave={() => {
        setShowOnHover(false);
      }}
      className="relative overflow-y-scroll"
    >
      <Image
        src={bgImage.path}
        width={bgImage.width}
        height={bgImage.height}
        alt={bgImage.description}
        className="w-full md:w-auto md:max-h-[600px] grayscale-[75%] opacity-75 rounded-lg"
      />
      {!showOnHover && (
        <motion.h3
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeInOut", duration: 0.5 }}
          variants={dissolveVariants}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-bolder text-white text-2xl tracking-widest title-shadow md:hidden cursor-pointer"
        >
          Contact
        </motion.h3>
      )}
      {showOnHover && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeInOut", duration: 1 }}
          variants={dissolveVariants}
          className="absolute top-0 w-full h-full p-8 md:grid grid-rows-[auto_1fr] occupation-shadow overflow-y-scroll"
        >
          <div className="overflow-y-scroll">
            <article className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row justify-between">
                <h3 className="order-2 sm:order-1 text-xl sm:text-3xl font-extrabold">
                  Mark Satin
                </h3>
                <a
                  href="/Software-Engineer-Resume_Mark-Satin.pdf"
                  download="Mark-Satin-SWE-Resume"
                  className="order-1 sm:order-2"
                >
                  <p className="text-right sm:text-left text-[.6rem] sm:text-lg underline cursor-pointer">
                    Download Resume
                  </p>
                </a>
              </div>
              <div className="border-4 border-[#800080] overflow-clip">
                <Image
                  src={bannerImage.path}
                  width={bannerImage.width}
                  height={bannerImage.height}
                  alt={bannerImage.description}
                  className="relative h-[250px] sm:h-[500px]"
                />
              </div>
              <div className="text-md w-full sm:text-xl text-center sm:tracking-widest lg:text-2xl xl:text-3xl xl:tracking-wide">
                <h4 className="tracking-wide">Software Engineer</h4>
                <h4>
                  Designer <span className="md:text-2xl">&#x2022;</span> Photographer
                </h4>
              </div>
            </article>
            <ContactForm className="bg-slate-200" />
          </div>
        </motion.div>
      )}
    </section>
  );
}