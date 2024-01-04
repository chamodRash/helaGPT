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
    <div className="md:absolute w-full md:w-auto md:-top-16 md:left-8 h-16 flex flex-row-reverse items-center md:flex-row justify-between gap-x-3 px-5 py-2">
      <Icon className={cn("h-10 w-10 p-2 rounded-lg", iconColor, bgColor)} />
      <div className="text-left md:text-left">
        <h2 className="text-base 2xl:text-lg font-bold tracking-wider">
          {title}
        </h2>
        <p className="text-xs 2xl:text-sm font-normal tracking-wider">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Heading;
