import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <div className="md:absolute w-full md:w-auto md:-top-16 md:left-8 h-16 flex flex-row-reverse md:flex-row justify-between gap-x-5 px-5 py-2">
      <Icon className={cn("h-full w-12 p-2 rounded-lg", iconColor, bgColor)} />
      <div className="text-left md:text-left">
        <h2 className="text-lg font-semibold tracking-wider">{title}</h2>
        <p className="text-sm font-light tracking-wider">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
