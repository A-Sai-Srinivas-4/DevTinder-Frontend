import { skillOptions } from "@/utils/constants";
import MultiSelect, { OptionType } from "./MultiSelect";
import { ProfileFormData } from "@/utils/types";

interface ProfileFormProps {
  formData: ProfileFormData;
  selectedSkills: OptionType[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<OptionType[]>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  buttonText?: string; // 🔥 dynamic
}

const ProfileForm = ({
  formData,
  handleChange,
  handleSubmit,
  selectedSkills,
  setSelectedSkills,
  buttonText = "Submit",
}: ProfileFormProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{buttonText}</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 rounded-xl shadow-md p-6 space-y-6"
      >
        {/* NAME */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="First Name"
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Last Name"
          />
        </div>

        {/* AGE + GENDER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Age"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered text-gray-400"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        {buttonText === "Sign Up" && (
          <>
            <div className="w-full">
              <input
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Email"
              />
            </div>

            <div className="w-full">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Password"
              />
            </div>
          </>
        )}

        {/* ABOUT */}
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          className="textarea textarea-bordered"
          placeholder="About"
        />

        {/* PHOTO */}
        <input
          type="text"
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Photo URL"
        />

        {/* SKILLS */}
        <MultiSelect
          options={skillOptions}
          value={selectedSkills}
          onChange={setSelectedSkills}
          placeholder="Select Skills"
        />

        <button type="submit" className="btn btn-primary w-full">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
