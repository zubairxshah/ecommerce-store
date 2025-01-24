import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType, Preview } from "sanity";

export const productType = defineType( {
    name: "product",
    title: "Products",
    type: "document",
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "blockContent",
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField(
            {
                name: "categories",
                title: "Categories",
                type: "array",
                of:[{type:"reference", to: {type:"category"}}],
                validation: (Rule) => Rule.required(),
            }
        ),
        defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
            price: "price",
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `$${select.price}`,
                media: select.media,
            };
        },
    },
})