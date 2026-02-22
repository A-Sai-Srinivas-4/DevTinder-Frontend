import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/appStore/store";
import { setUser } from "@/appStore/slices/authSlice";
import MultiSelect, { OptionType } from "./MultiSelect";
import { skillOptions } from "@/utils/constants";
import UserCard from "./UserCard";

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

  // 🔁 Prefill existing user
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

  // 📝 Handle inputs
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

  // 🚀 Submit
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
    <div className="flex justify-center items-center h-10/12">
      <div className="max-w-3xl p-6">
        {/* HEADER */}
        {/* <h1 className="text-3xl font-bold mb-6">Edit Profile</h1> */}

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-base-200 rounded-xl shadow-md p-6 space-y-6"
        >
          {/* NAME */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* AGE + GENDER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="18"
                max="100"
              />
            </div>

            <div className="form-control">
              <label className="label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          {/* ABOUT */}
          <div className="form-control">
            <label className="label">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows={3}
            />
          </div>

          {/* PHOTO URL */}
          <div className="form-control">
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* SKILLS */}
          <div className="form-control">
            <label className="label">Skills</label>
            <MultiSelect
              options={skillOptions}
              value={selectedSkills}
              onChange={setSelectedSkills}
              placeholder="Select your skills"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end pt-2">
            <button type="submit" className="btn btn-primary px-8">
              Update Profile
            </button>
          </div>
        </form>
      </div>
      {user && <UserCard data={previewUser} />}
    </div>
  );
};

export default EditProfile;
