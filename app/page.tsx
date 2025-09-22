import Link from "next/link";

export default function Home() {
  return (
   <div>
    <h1 className="text-3xl font-bold underline">Hello welcome to the Keralite properties
    </h1>
    <Link href="/signup">Login</Link>
   </div>
  );
}
