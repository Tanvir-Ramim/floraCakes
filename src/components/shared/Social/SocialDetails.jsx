import { Cake, Globe } from "lucide-react";



const SocialDetails = () => {
  return (
    <>
      <p className="text- text-xs text-white text-justify">
        We offer services across Cakes & Pastries and Gift Baskets etc.
      </p>
      <div className="flex justify-center gap-5  py-2">
        <a href={"https://www.borsalle.com"} className="hover:shadow-lg duration-500 p-2">
          <div className="text-center]">
            <Globe
              className="text-xl mb-1 text-white mx-auto "
            />
            <p className="text-white text-xs ">www.borsalle.com</p>
          </div>
        </a>
        <a href={"https://www.borsalle.com/cakes"} className="hover:shadow-lg duration-500 p-2">
          <div>
            <Cake
              className="t mx-auto mb-1 text-pink-600"
            />
            <p className="text-white text-xs">Cakes</p>
          </div>
        </a>
      </div>

    </>
  );
};

export default SocialDetails;
