import { RootState } from "@/redux/store";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutSuccess,
} from "@/redux/user/user-slice";
import { useDispatch } from "react-redux";
import useLogout from "@/hooks/useLogout";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useRef, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";

const Profile = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const logout = useLogout();
  const { userNow } = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState<string>(userNow?.username || "");
  const [bio, setBio] = useState<string>(userNow?.bio || "");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const filePicker = useRef<HTMLInputElement>(null);
  const [imageFileProgress, setImageFileProgress] = useState<number | null>(
    null
  );
  const [imageFileError, setImageFileError] = useState<string | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setImageFile(selectedFile);
      setImageURL(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    const uploadImage = () => {
      if (imageFile) {
        setImageFileError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileProgress(Number(progress.toFixed(0)));
          },
          () => {
            setImageFileError("Could not upload Image (File size too large)");
            setImageFileProgress(null);
            setImageFile(null);
            setImageURL(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageURL(downloadURL);
            });
          }
        );
      }
    };
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleUpdateUser = async () => {
    dispatch(updateUserStart());
    try {
      const res = await axios.put(`/users/update-user/${userNow?._id}`, {
        username,
        bio,
      });
      if (res.data) {
        dispatch(updateUserSuccess(res.data));
        toast({
          title: "Updated successfully",
          description: `${username} data was updated successfully!`,
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data && error.response.data.msg) {
          dispatch(updateUserFailure(error.response.data.msg));
          toast({ title: "Error", description: error.response.data.msg });
        }
      }
    }
  };

  const handleUpdatePassword = async () => {
    dispatch(updateUserStart());
    try {
      const res = await axios.put(`/users/update-password/${userNow?._id}`, {
        newPassword,
        confirmPassword,
      });
      if (res.data) {
        dispatch(updateUserSuccess(res.data));
        toast({
          title: "Updated successfully",
          description: `${username} password was updated successfully!`,
        });
        dispatch(signOutSuccess());
        navigate("/login");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data && error.response.data.msg) {
          dispatch(updateUserFailure(error.response.data.msg));
          toast({ title: "Error", description: error.response.data.msg });
        }
      }
    }
  };

  const deleteAccount = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await axios.delete(`/users/user/${userNow?._id}`);
      if (res.data) {
        dispatch(deleteUserSuccess());
        toast({ title: "Account deleted", description: "See you soon!" });
        logout();
        navigate("/login");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data && error.response.data.msg) {
          dispatch(deleteUserFailure(error.response.data.msg));
          toast({ title: "Error", description: error.response.data.msg });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong, try again",
          });
        }
      }
    }
  };
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
    w-full gap-10"
    >
      <div className="flex flex-col justify-center items-center pt-10">
        <div className="flex items-center gap-4 pb-4 ">
          <Avatar>
            <AvatarImage
              src={userNow?.profilePic}
              alt="Avatar"
              className="w-28 h-28 object-cover rounded-full
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
        <div className="flex items-center gap-4 w-full">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full mt-4">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteAccount}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button className="w-full mt-4" variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>
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
              <div
                className="flex flex-col items-center justify-center gap-4 relative"
                onClick={() => filePicker.current?.click()}
              >
                {imageFileProgress && (
                  <CircularProgressbar
                    value={imageFileProgress || 0}
                    text={`${imageFileProgress}%`}
                    strokeWidth={5}
                    styles={{
                      root: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      },
                      path: {
                        stroke: `rgba(62, 152, 199, ${
                          imageFileProgress / 100
                        })`,
                      },
                    }}
                  />
                )}
                <Avatar>
                  <AvatarImage
                    src={imageURL || userNow?.profilePic}
                    alt="Avatar"
                    className={`w-28 h-28 object-cover rounded-full
                    border-2 border-primary shadow-md shadow-gray-500
                  ${
                    imageFileProgress && imageFileProgress < 100 && "opacity-60"
                  }`}
                  />
                  <AvatarFallback>DD</AvatarFallback>
                </Avatar>
                {imageFileError && (
                  <Alert>
                    <AlertTitle>Upload Error</AlertTitle>
                    <AlertDescription>{imageFileError}</AlertDescription>
                  </Alert>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  ref={filePicker}
                  className="rounded-lg text-sm border border-gray-700
                  w-full"
                  hidden
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  defaultValue={userNow?.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
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
                  name="bio"
                  value={bio}
                  defaultValue={userNow?.bio}
                  className="text-gray-700 dark:text-gray-400"
                  onChange={(e) => setBio(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Your bio will be shown on your profile.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleUpdateUser}>
                Save changes
              </Button>
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
                <Label htmlFor="current">New Password</Label>
                <Input
                  id="current"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Confirm Password</Label>
                <Input
                  id="new"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleUpdatePassword}>
                Save password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
