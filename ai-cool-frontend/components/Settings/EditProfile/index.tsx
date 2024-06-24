import { useEffect, useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import axios from "axios";

type EditProfileProps = {};

const EditProfile = ({}: EditProfileProps) => {
  const [objectURL, setObjectURL] = useState<any>("/images/avatar.jpg");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   const [location, setLocation] = useState<string>("Sai Gon, Vietnam");
  //   const [bio, setBio] = useState<string>("");

  const [user, setUser] = useState();

  useEffect(() => {
    const userData = localStorage.getItem("aiUserData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      name,
      password,
    };

    try {
      const response = await axios.patch(
        `https://aicool-server.vercel.app/api/auth/edit-user/${user?.email}`,
        updatedData
      );

      const userData = response.data.user;
      localStorage.setItem("aiUserData", JSON.stringify(userData));
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="mb-8 h4 md:mb-6">Edit profile</div>
      <div className="mb-3 base2 font-semibold text-n-6 dark:text-n-1">
        Avatar
      </div>
      <div className="flex items-center mb-6">
        <div className="relative flex justify-center items-center shrink-0 w-28 h-28 mr-4 rounded-full overflow-hidden bg-n-2 dark:bg-n-6">
          {objectURL !== null ? (
            <Image
              className="object-cover rounded-full"
              src={objectURL}
              fill
              alt="Avatar"
            />
          ) : (
            <Icon className="w-8 h-8 dark:fill-n-1" name="profile" />
          )}
        </div>
        {/* <div className="grow">
          <div className="relative inline-flex mb-4">
            <input
              className="peer absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              onChange={handleUpload}
            />
            <button className="btn-stroke-light peer-hover:bg-n-3 dark:peer-hover:bg-n-5">
              Upload new image
            </button>
          </div>
          <div className="caption1 text-n-4">
            <p>At least 800x800 px recommended.</p>
            <p>JPG or PNG and GIF is allowed</p>
          </div>
        </div> */}
      </div>
      <Field
        className="mb-6"
        label="Name"
        placeholder="Name"
        icon="profile-1"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        required
      />
      <Field
        className="mb-6"
        label="Password"
        placeholder="password"
        icon="profile"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      {/* <Field
        className="mb-6"
        label="Bio"
        placeholder="Short bio"
        icon="user-check"
        value={bio}
        onChange={(e: any) => setBio(e.target.value)}
        textarea
        required
      /> */}
      <button type="submit" className="btn-blue w-full">
        Save changes
      </button>
    </form>
  );
};

export default EditProfile;
