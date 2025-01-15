import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="p-3 h-screen w-16 bg-slate-800">
      <Link href="/cms">
        <Image
          src="https://assets.techtoniclabs.id/techtoniclabs-icon.png"
          height={64}
          width={64}
        />
      </Link>
    </div>
  );
}
