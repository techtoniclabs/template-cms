import { Button } from "@/core/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-screen py-5 z-10 sticky top-0 bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="wrapper flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link href="/">
            <span className="font-semibold text-xl">LOGOBOX</span>
          </Link>
          <ul className="flex gap-2">
            <li>
              <Button variant="ghost">Link 1</Button>
            </li>
            <li>
              <Button variant="ghost">Link 2</Button>
            </li>
            <li>
              <Button variant="ghost">Link 3</Button>
            </li>
          </ul>
        </div>
        <div>
          <Button asChild>
            <Link href="/cms">CMS</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
