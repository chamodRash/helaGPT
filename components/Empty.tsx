import Lottie from "lottie-react";
import LottiePlayer from "@lottiefiles/react-lottie-player";

import EmptyAnimation from "@/public/empty_animation.json";

interface EmptyProps {
  label: string;
}

const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full px-20 flex items-center justify-center">
      <div className="w-72 h-72 flex flex-col items-center">
        <Lottie animationData={EmptyAnimation} />
        <p className="text-muted-foreground text-center text-sm">{label}</p>
      </div>
    </div>
  );
};

export default Empty;
