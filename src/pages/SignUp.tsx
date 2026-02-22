import { useState } from "react";
import ProfileForm from "@/components/ui/ProfileForm";
import { api } from "@/services/api";
import { OptionType } from "@/components/ui/MultiSelect";
import { endpoints } from "@/utils/endpoints";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    about: "",
    photoUrl: "",
    emailId: "",
    password: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<OptionType[]>([]);

  const navigate = useNavigate();
  const handleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      age: Number(formData.age),
      skills: selectedSkills.map((s) => s.value),
    };

    await api.post(endpoints.register, payload);

    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      about: "",
      photoUrl: "",
      emailId: "",
      password: "",
    });

    setSelectedSkills([]);

    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center">
      <ProfileForm
        formData={formData}
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Sign Up"
      />
    </div>
  );
};

export default SignUp;
