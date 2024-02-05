import { RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

const Profile = () => {
  const { userNow } = useSelector((state: RootState) => state.user);
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate.replace(",", ".");
  };
  const formattedCreatedAt = userNow?.createdAt
    ? formatDate(userNow.createdAt)
    : "";
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center
    w-full h-[90vh]"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-4 pb-4 ">
          <Avatar>
            <AvatarImage
              src={userNow?.profilePic}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full
            border-2 border-primary shadow-md shadow-gray-500"
            />
            <AvatarFallback>DD</AvatarFallback>
          </Avatar>

          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-wide">
              @{userNow?.username}
            </p>
            <p className="text-sm text-gray-500">{userNow?.email}</p>
            <p className="text-sm text-gray-500">
              Joined: {formattedCreatedAt}
            </p>
          </div>
        </div>
        <div className="w-full border-b border-gray-700" />
        <p className="mt-4 max-w-sm text-gray-700 dark:text-gray-400 text-center">
          {userNow?.bio}
        </p>
        <Button variant="secondary" className="w-full mt-4">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;
