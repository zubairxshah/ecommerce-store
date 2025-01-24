import { title } from "process";

export const metadata = {
    title: 'Sanity Studio',
    description: 'Database Lies here..',
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }