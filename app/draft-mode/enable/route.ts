// src/app/api/draft-mode/enable/route.ts

import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const token = process.env.SANITY_VIEWER_TOKEN;

export async function GET(request: Request) {
 const {isValid, redirectTo = "/"} = await validatePreviewUrl(
  client.withConfig({token}),
  request.url,
 );

if (!isValid) {
  return new Response("Invalid token", {status: 401});
}

(await draftMode()).enable();

redirect(redirectTo)
}
