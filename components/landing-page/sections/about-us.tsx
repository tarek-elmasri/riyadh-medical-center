"use client";
import { motion } from "framer-motion";
import Container from "@/components/landing-page/container";
import logo from "@/assets/logo.png";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="xl:mt-24" id="aboutus">
      <Container>
        <div className="grid md:grid-cols-2 gap-6 place-items-center px-6 pb-32">
          <Image src={logo} alt="logo" className="md:order-2" />

          <div className="flex flex-col gap-6 items-center md:items-start overflow-hidden">
            <motion.h2
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 0.5 }}
              className="font-bold text-3xl text-indigo-950 hidden md:block"
            >
              عن مستوصف الرياض الطبي
            </motion.h2>
            <motion.p
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 0.5 }}
              className="text-indigo-900"
            >
              إن إدارة مركز الرياض الطبي لم تألوا جهداً وعلى مدار 30 عاماً في
              تقديم نموذج طبي متميز للخدمات الطبية في كافة التخصصات الطبية بحيث
              يجد المراجع كل ما يصبوا اليه من تخصصات طبية في مكان واحد لرفع
              المعاناة على المريض والحصول على خدماته الطبية المزودة بأحدث
              الأجهزة الطبية والتقنيات الطبية الحديثة. .
            </motion.p>

            <motion.p
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 0.5 }}
              className="text-indigo-900"
            >
              ولقد كانت جودة الرعاية الطبية هي اساس مبدأنا وتميزنا على مدار
              ثلاثون عاماً أثمر ذلك على استقبال مجمعنا على اكثر من ألف مراجع
              يومياً لتلقي الرعاية الصحية.
            </motion.p>

            <motion.p
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 0.5 }}
              className="text-indigo-900"
            >
              نستخدم معرفتنا الفائقة والتشخيصات المتقدمة لعلاج مجموعة واسعة من
              المشكلات الصحية. في مستوصف الرياض الطبي، نأخذ مرضانا ليكونوا محور
              كل ما نقوم به. يعمل طاقمنا الطبي معًا لتوفير رعاية جماعية
              استثنائية وشاملة. الرعاية الشخصية والاحترافية هي مفتاحنا الذي يعزز
              الشفاء العاجل، ويعزز صحتك ورفاهيتك بشكل عام.
            </motion.p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
