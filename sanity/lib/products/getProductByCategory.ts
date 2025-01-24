import { defineQuery } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/live";

export const getProductByCategory = async (categorySlug:string) => {
    // console.log("Received slug:", slug); // Add this line to debug

    const PRODUCT_BY_ID_CATEGORY = defineQuery(`
        *[_type == "product" && references(*[_type=="category" && slug.current == $categorySlug]._id)] 
        | order(name asc)[0]`);
    
    try{
    const product = await sanityFetch({
        query: PRODUCT_BY_ID_CATEGORY,
        params: {categorySlug},
    });
    return product.data || null;
} catch (error) {
    console.error("Error fetching products by category:", error);
    return null;
}
}