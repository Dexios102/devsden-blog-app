import { RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

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
      className="flex flex-col md:flex-row items-center justify-evenly
    w-full md:h-[92vh] gap-10"
    >
      <div className="flex flex-col justify-center items-center pt-10">
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
      </div>
      <Tabs defaultValue="account" className="w-[400px] pb-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-center">
                <Avatar>
                  <AvatarImage
                    src={userNow?.profilePic}
                    alt="Avatar"
                    className="w-26 h-26 object-cover rounded-full
            border-2 border-primary shadow-md shadow-gray-500"
                  />
                  <AvatarFallback>DD</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue={userNow?.username} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={userNow?.email} disabled />
              </div>
              <div className="space-y-1">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  placeholder="Type your message here."
                  id="bio"
                  defaultValue={userNow?.bio}
                  className="text-gray-700 dark:text-gray-400"
                />
                <p className="text-sm text-muted-foreground">
                  Your bio will be shown on your profile.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
