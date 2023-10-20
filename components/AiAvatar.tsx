import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AiAvatar from "@/public/avatar_dp.png";

const UserAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="../../../../../../public/avatar_dp.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
