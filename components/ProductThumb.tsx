'use client'
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/sanity/lib/imageUrl";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default function ProductThumb({product}:{product:Product}) {
    const isOutOfStock = product.stock != null && product.stock <= 0;
    return (
        <div>
            
            <Link href={`/product/${product.slug?.current}`}
            className={`group flex flex-col bg-white rounded-lg border border-gray-200 
                shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden py-2 
                ${isOutOfStock ? "opacity-50" : ""} `}
                >
                    <div className="relative aspect-square w-full h-full overflow-hidden">
                        {product.image && (
                            <Image
                                src={imageUrl(product.image as SanityImageSource).url()}
                                alt={product.name || "Product Image"}
                                fill
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}
                        {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
                                <span className="text-white font-bold text-lg">Out of Stock</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="p-4">
                            <h2 className="text-sm mt-2 font-bold text-gray-600">{product.name}</h2>
                            <p className="text-sm mt-2 font-bold text-gray-600 line-clamp-2">
                            {
                                product.description?.map((block)=> 
                                block._type === "block" 
                            ? block.children?.map((child)=> child.text).join("") : "")
                            .join(" ") || "No description available"
                            }
                            </p>
                            <p className="mt-2 text-lg font-bold text-gray-900">
                                ${product.price}
                            </p>
                        </div>
                    </div>
            </Link>
        
        </div>
    )
}


// <div className="product-thumb">
//             <Link href={`/product/${product.slug?.current}`}
//             className={`group flex flex-col bg-white rounded-lg border border-gray-200 
//                 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden 
//                 ${isOutOfStock ? "opacity-50" : ""} `}
//                 >
//                     <div className="relative aspect-square w-full h-full overflow-hidden">
//                         {product.image && (
//                             <Image
//                                 src={imageUrl(product.image).url()}
//                                 alt={product.name || "Product Image"}
//                                 fill
//                                 className="object-contain transition-transform duration-300 group-hover:scale-105"
//                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                             />
//                         )}
//                         {isOutOfStock && (
//                             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
//                                 <span className="text-white font-bold text-lg">Out of Stock</span>
//                             </div>
//                         )}
//                     </div>
//             </Link>
//         </div>