// React & Redux
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutSuccess,
} from "@/redux/user/user-slice";
// React Router
import { useNavigate } from "react-router-dom";
// Custom Hooks
import useLogout from "@/hooks/useLogout";
// UI Components
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
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
import { Progress } from "@/components/ui/progress";

// Firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
// Axios
import axios, { AxiosError } from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const logout = useLogout();
  const { userNow } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({});
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

  const uploadImage = async () => {
    setImageFileError(null);
    const storage = getStorage(app);

    if (imageFile !== null) {
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile as Blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileProgress(Number(progress.toFixed(0)));
        },
        (error) => {
          setImageFileError("Could not upload Image (File size too large)");
          setImageFileProgress(null);
          setImageFile(null);
          setImageURL(null);
          console.error("Upload error:", error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageURL(downloadURL);
            console.log(downloadURL);
            setFormData((prevFormData) => ({
              ...prevFormData,
              profilePic: downloadURL,
            }));
          } catch (error) {
            console.error("Download URL error:", error);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(formData).length > 0) {
      dispatch(updateUserStart());
      try {
        dispatch(updateUserStart());
        const res = await axios.put(
          `/users/update-user/${userNow?._id}`,
          formData
        );
        if (res.data) {
          dispatch(updateUserSuccess(res.data));
          toast({
            title: "Updated successfully",
            description: `Profile was updated successfully!`,
          });
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.msg
          ) {
            dispatch(updateUserFailure(error.response.data.msg));
            toast({ title: "Error", description: error.response.data.msg });
          }
        }
      }
    } else {
      toast({ title: "Invalid", description: "No changes were made" });
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
          description: `Password was updated successfully!`,
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
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div
                  className="flex flex-col items-center justify-center"
                  onClick={() => filePicker.current?.click()}
                >
                  <div className="w-32 h-32 overflow-hidden rounded-full">
                    <Avatar>
                      <AvatarImage
                        src={imageURL || userNow?.profilePic}
                        alt="Avatar"
                        className={`w-full h-full object-cover 
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
                  </div>
                  <Progress
                    value={imageFileProgress}
                    className="w-[100%] mt-4
                bg-gray-700 opacity-10"
                  />
                  <input
                    type="file"
                    name="image"
                    id="image"
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
                    name="username"
                    id="username"
                    defaultValue={userNow?.username}
                    onChange={handleChange}
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
                    name="bio"
                    id="bio"
                    defaultValue={userNow?.bio}
                    onChange={handleChange}
                    className="text-gray-700 dark:text-gray-400"
                  />
                  <p className="text-sm text-muted-foreground">
                    Your bio will be shown on your profile.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  Save changes
                </Button>
              </CardFooter>
            </form>
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
