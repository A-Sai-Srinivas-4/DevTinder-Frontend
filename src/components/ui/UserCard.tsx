import { User } from "@/utils/types";

interface UserCardProps {
  data: User;
  handleAction: (requestId: string, status: "interested" | "ignore") => void;
}

const UserCard = ({ data, handleAction }: UserCardProps) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = data;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="user avatar" className="h-80" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>
          {age}, {gender} <br />
        </p>
        <p>{about}</p>
        <div className="card-actions justify-center items-center">
          <button
            className="btn btn-primary"
            onClick={() => handleAction(_id, "ignore")}
          >
            Ignore
          </button>

          <button
            className="btn bg-green-500"
            onClick={() => handleAction(_id, "interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
