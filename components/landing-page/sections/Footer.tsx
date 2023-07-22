"use client";

import Container from "@/components/landing-page/container";
import logo from "@/assets/logo.png";
import { Facebook, Instagram, Twitter, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-white px-6 pt-24 pb-12">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row justify-between items-center">
          {/* logo */}
          <Image src={logo} alt="logo" />

          {/* social media */}
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="flex items-center justify-center h-12 aspect-square rounded-full bg-indigo-700 cursor-pointer hover:shadow-md"
            >
              <Facebook color="#fff" className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center h-12 aspect-square rounded-full bg-indigo-700 cursor-pointer hover:shadow-md"
            >
              <Twitter color="#fff" className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center h-12 aspect-square rounded-full bg-indigo-700 cursor-pointer hover:shadow-md"
            >
              <Instagram color="#fff" className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="py-12 ">
          <p>تواصل معنا</p>

          <div className="mt-3 flex justify-start items-center gap-3">
            <div className="flex items-center justify-center h-6 aspect-square rounded-full bg-indigo-700 cursor-pointer hover:shadow-md">
              <Phone size={10} color="#fff" />
            </div>
            <Link href="phoneto:+96601111111">9660112321456+</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
