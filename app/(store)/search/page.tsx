import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

export default async function SearchPage({searchParams}:{searchParams:{query:string}}) {
    const {query} = await searchParams;
    const products = await searchProductsByName(query)
    console.log(products);
    console.log(query);

    if (!products?.length) return (<div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Product not found for: {query}</h1>
        <p className="text-gray-600 text-center">Try seaching with different keywords..</p>

      </div>
      </div>)
    return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search Result for query {query}{" "}
          <ProductGrid products={products} />
        </h1>
      </div>
    </div>
  );
}
