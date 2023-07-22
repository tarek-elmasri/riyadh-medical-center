import img from "@/assets/image1.png";
import Image from "next/image";

const ImageSection = () => {
  return (
    <>
      <div className="bg-white pt-48 px-6">
        <div className="flex justify-center">
          <Image src={img} alt="RMC" />
        </div>
      </div>

      <div className="bg-white rounded-bl-full p-24 shadow-md" />
    </>
  );
};

export default ImageSection;
