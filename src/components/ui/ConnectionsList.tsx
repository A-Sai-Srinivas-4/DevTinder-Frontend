import { User } from "@/utils/types";

const ConnectionsList = ({
  connections,
  isRequest,
}: {
  connections: User[];
  isRequest?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <ul className="list bg-base-300 rounded-box shadow-md w-xl">
        {connections.map((connection) => {
          return (
            <li
              key={connection._id}
              className="list-row flex justify-between items-center"
            >
              <div className="flex ">
                <div>
                  <img
                    className="size-20 rounded-full"
                    src={connection.photoUrl}
                    alt="user avatar"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    {connection.firstName} {connection.lastName}
                  </div>

                  <p className="text-sm font-semibold opacity-60">
                    {connection.age}, {connection.gender}
                  </p>
                  <p className="list-col-wrap text-sm">{connection.about}</p>
                  <div>
                    <span className="text-xs opacity-60">
                      {connection.skills.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
              {isRequest && (
                <div className="flex gap-4">
                  <button className="btn btn-primary">Reject</button>
                  <button className="btn btn-secondary">Accept</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConnectionsList;
