import { AddToBasketButton } from "@/components/AddToBasketButton";
import { imageUrl } from "@/sanity/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

// console.log(crypto.randomUUID().slice(0, 5) + `>>> Rendered the product page cache for ${slug}`);


  
  if (!product) {
    return notFound();
  }
  const isOutOfStock = product?.stock != null && product.stock <= 0;
  return (
    <div className="conatiner mx-auto px-4 py-8">
      Product Page
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg 
            shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {product?.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product Image"}
              layout="fill"
              objectFit="cover"
              className="object-contain transition-transform duration-300 hover:scale-105"
              fill
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-2xl font-bold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="">
            <h1 className="text-3xl font-bold mb-6">{product?.name}</h1>
            <div className="text-xl font-semibold mb-4">
              ${product?.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product?.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
          <div className="">
              <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}
