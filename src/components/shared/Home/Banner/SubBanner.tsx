import React from "react";

const SubBanner = () => {
  return (
    <div className="mx-auto w-full max-w-[1340px] bg-white px-4 py-5 md:py-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
  {
    title: "Strawberry Cream Dream Cake",
    description: "Delicate vanilla sponge layered with fresh strawberries and whipped cream, perfect for any celebration.",
    link: "/cakes",
    image: "https://img.freepik.com/free-photo/front-close-view-little-creamy-cake-with-fresh-strawberry-light-cake-sweet-fruit-berry-bake_140725-31915.jpg?t=st=1753119829~exp=1753123429~hmac=1da3ba1ad02a018773b31185bc8217a5cc57db9b55930aa070dbf31cc8137d86&w=1380",
    category: "cake"
  },
  {
    title: "Elegant Pink Rose Bouquet",
    description: "A romantic arrangement of soft pink roses, beautifully tied for gifting or home decor.",
    link: "/cakes",
    image: "https://img.freepik.com/free-photo/beautiful-bouquet-pink-roses-grey-table_114579-39463.jpg?t=st=1753120323~exp=1753123923~hmac=41628f962afb47429f04689e32aa2d6da3702428073bc6a6452dbc924adbf53d&w=740",
    category: "flowers"
  },
  {
    title: "Festive Celebration Cake",
    description: "Rich, moist cake decorated with candles, ideal for birthdays and special occasions.",
    link: "/cakes",
    image: "https://img.freepik.com/free-photo/pretty-cake-decorated-with-candles_23-2147669181.jpg?t=st=1753120123~exp=1753123723~hmac=c06e9ce688fd3b146f5f7d05e8a0471027b2630d189e5d82c888b64501221d81&w=1380",
    category: "cake"
  }
].map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col-reverse overflow-hidden group"
            >
              <div
                className="relative w-full h-[235px] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 flex items-center px-6">
                <div className="w-full text-left">
                  <a href={item.link} className="absolute inset-0" />
                  <h3 className="mb-2 font-semibold text-[#323232]">
                    {item.title}
                  </h3>
                  <a
                    href={item.link}
                    className="text-sm text-[#a3a3a3] hover:text-orange-500"
                  >
                    Discover Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubBanner;
