import {
  Images,
  LayoutTemplate,
  Megaphone,
  NotebookPen,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";

export const Menus = [
  {
    href: "/cms/pages",
    name: "Pages",
    icon: <LayoutTemplate className="w-6 h-6" />,
  },
  {
    href: "/cms/blog",
    name: "Blog",
    icon: <NotebookPen className="w-6 h-6" />,
  },
  {
    href: "/cms/media-library",
    name: "Media Library",
    icon: <Images className="w-6 h-6" />,
  },
  {
    href: "/cms/campaign",
    name: "Campaign",
    icon: <Megaphone className="w-6 h-6" />,
  },
  {
    href: "/cms/settings",
    name: "Settings",
    icon: <Settings className="w-6 h-6" />,
  },
];

export default function Sidebar() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="h-screen w-[60px] flex flex-col bg-slate-800 border-r border-slate-700">
        <div className="p-3 border-b border-slate-700">
          <Tooltip>
            <TooltipTrigger>
              <Link href="/">
                <Image
                  src="https://assets.techtoniclabs.id/techtoniclabs-icon.png"
                  height={64}
                  width={64}
                  alt="Icon"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
        </div>
        <ul className="flex flex-col py-2 text-center items-center">
          {Menus.map((menu, id) => (
            <Tooltip key={id}>
              <TooltipTrigger>
                <Link href={menu.href}>
                  <li className="my-2 p-2 hover:bg-slate-700 rounded-md transition-colors">
                    {menu.icon}
                  </li>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{menu.name}</TooltipContent>
            </Tooltip>
          ))}
        </ul>
      </div>
    </TooltipProvider>
  );
}
