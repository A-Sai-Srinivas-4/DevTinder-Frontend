import { api } from "@/services/api";
import { endpoints } from "@/utils/endpoints";
import { User } from "@/utils/types";

interface Props {
  data: (User & { requestId?: string })[];
  isRequest?: boolean;
  handleAction?: (requestId: string, status: "accepted" | "rejected") => void;
}

const List = ({ data, isRequest, handleAction }: Props) => {
  return (
    <ul className="list bg-base-300 rounded-box shadow-md w-xl">
      {data.map((user) => (
        <li
          key={user._id}
          className="list-row flex justify-between items-center"
        >
          <div className="flex gap-4">
            <img className="size-20 rounded-full" src={user.photoUrl} />

            <div className="flex flex-col gap-1">
              <p>
                {user.firstName} {user.lastName}
              </p>

              <p className="text-sm opacity-60">
                {user.age}, {user.gender}
              </p>

              <p className="text-sm">{user.about}</p>

              <p className="text-xs opacity-60">{user.skills.join(", ")}</p>
            </div>
          </div>

          {isRequest && user.requestId && (
            <div className="flex gap-2">
              <button
                className="btn btn-error"
                onClick={() => handleAction!(user.requestId!, "rejected")}
              >
                Reject
              </button>

              <button
                className="btn btn-success"
                onClick={() => handleAction!(user.requestId!, "accepted")}
              >
                Accept
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
