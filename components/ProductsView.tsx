import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import CategorySelectorComponent from "./Category-Selector";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

export default function ProductsView ({products, categories} : ProductsViewProps) {
    return (
        <div>
            {/* Categories */}
            <div className="w-full sm:w-[200px]">
                <CategorySelectorComponent categories = {categories} />
            </div>
            {/* Products */}
            <div className="flex-1">
                <div className="">
                    <ProductGrid products={products} />

                    <hr className="w-1/2 sm:w-3/4" />
                </div>
            </div>
        </div>
    )

}