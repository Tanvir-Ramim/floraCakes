import { Metadata } from "next";
import ProductDetailPageComponent from "@/components/ProductDetails";
import cakeService, { IProduct } from "@/services/product.service";
import addonService from "@/services/addon-service";
import { IAddon } from "@/@types";
import reviewService, { IReview } from "@/services/review.service";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const response = await cakeService.getCakeById(params.id);
  const cake = response?.data;

  return {
    title: cake?.title || "Cake Details",
    description: cake?.description || "View delicious cake details.",
  };
}

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const addParams = {
    type: "other",
    fields: "name,price,image",
  };

  const [cakeRes, addonRes, reviews] = await Promise.allSettled([
    cakeService.getCakeById(params.id),
    addonService.getAddons(addParams),
    reviewService.getReviewCake({ cakeId: params.id, sort: "latest" ,fields: "image,rating,comment,createdAt,cakeId,user,cakeName"}),
  ]);

  const cake: IProduct =
    cakeRes.status === "fulfilled" ? cakeRes.value.data : null;

  const addons: IAddon[] =
    addonRes.status === "fulfilled" ? addonRes.value.data.addons : [];
  const reviewsData: IReview[] =
    reviews.status === "fulfilled" ? reviews.value.data.reviews : [];

  console.log("Reviews Data:", reviewsData);
  if (!cake) {
    return <div className="p-10 text-center text-xl">Cake not found</div>;
  }

  return (
    <div className="mx-5">
      <ProductDetailPageComponent cake={cake} addons={addons} review={reviewsData} />
    </div>
  );
};

export default ProductDetailPage;
