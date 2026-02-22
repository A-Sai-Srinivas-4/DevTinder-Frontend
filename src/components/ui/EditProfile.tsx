import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/appStore/store";
import { setUser } from "@/appStore/slices/authSlice";
import MultiSelect, { OptionType } from "./MultiSelect";
import { skillOptions } from "@/utils/constants";
import UserCard from "./UserCard";
import ProfileForm from "./ProfileForm";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    about: "",
    photoUrl: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<OptionType[]>([]);

  const previewUser = user
    ? {
        ...user,
        ...formData,
        age: formData.age ? Number(formData.age) : user.age,
        skills: selectedSkills.map((skill) => skill.value),
      }
    : null;

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age?.toString() || "",
        gender: user.gender || "",
        about: user.about || "",
        photoUrl: user.photoUrl || "",
      });

      if (user.skills) {
        setSelectedSkills(
          user.skills.map((skill) => ({
            label: skill,
            value: skill,
          })),
        );
      }
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      age: formData.age ? Number(formData.age) : undefined,
      skills: selectedSkills.map((skill) => skill.value),
    };

    try {
      const res = await api.patch("/profile", payload);
      dispatch(setUser(res.data.data));
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <ProfileForm
        formData={formData}
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Update Profile"
      />
      {user && <UserCard data={previewUser} isPreview />}
    </div>
  );
};

export default EditProfile;
