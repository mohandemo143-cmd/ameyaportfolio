import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image 
  src="/logo.png" 
  alt="Logo" 
  width={150} 
  height={50} 
  style={{ width: "150px", height: "auto" }} // <-- This exact line is what clears the warning
/>
    </Link>
  );
}