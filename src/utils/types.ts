export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId?: string;
  age: number;
  gender: "male" | "female" | "others";
  about: string;
  skills: string[];
  photoUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConnectionRequest {
  _id: string;
  fromUserId: User;
  toUserId: string;
  status: "interested" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  emailId?: string;
  password?: string;
  about: string;
  photoUrl: string;
}