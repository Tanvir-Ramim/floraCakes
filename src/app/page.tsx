import BannerSlider from "@/components/shared/Home/Banner/Banner";
import BirthdayAndAny from "@/components/shared/Home/BirthdayAndAny/BirthdayAndAny";
import BlogPage from "@/components/shared/Home/Blog/Blogs";
import LogoList from "@/components/shared/Home/Client/LogoList";
import Discount from "@/components/shared/Home/DIscount-Info/Discount";
import GiftSection from "@/components/shared/Home/GiftCard/GiftSection";
import Kitchen from "@/components/shared/Home/kitchen/kitchen";
import ProductShowcase from "@/components/shared/Home/ProductTypes/ProductshowCase";
import SaleOff from "@/components/shared/Home/SaleOf/SaleOf";
import TrendingCakes from "@/components/shared/Home/trendingCakes/TrendingCakes";

export default function Home() {
  return (
    <div>
      <BannerSlider />
      <TrendingCakes />
      <ProductShowcase />
      <SaleOff />
      <LogoList />
      <BirthdayAndAny></BirthdayAndAny>

      <Kitchen />
      <BlogPage />
      <GiftSection></GiftSection>
      <Discount />
    </div>
  );
}
