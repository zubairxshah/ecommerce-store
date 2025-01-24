import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";

export default async function CategoryPage({params}:{params: Promise<{slug:string}>}) {
    const {slug} = await params;
    const product = await getProductByCategory(slug);
    const categories = await getAllCategories()
    
    // Convert single product to array and handle null case
    const safeProducts = product ? [product] : [];

    return (
        <div className="flex flex-col items-center justify-top min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {slug.split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                    Collection
                </h1>
                <div className="prose max-w-none mb-6">
                    <ProductsView products={safeProducts} categories={categories} />
                </div>
            </div>
        </div>
    )
}
