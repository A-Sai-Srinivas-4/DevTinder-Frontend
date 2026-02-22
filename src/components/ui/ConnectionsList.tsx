import { User } from "@/utils/types";

const ConnectionsList = ({ connections }: { connections: User[] }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <ul className="list bg-base-300 rounded-box shadow-md w-xl">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Here are your connections
        </li>

        {connections.map((connection) => {
          return (
            <li className="list-row">
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

                <p className="text-xs uppercase font-semibold opacity-60">
                  {connection.age}, {connection.gender}
                </p>
                <p className="list-col-wrap text-xs">{connection.about}</p>
                <div>
                  <span className="text-xs opacity-60">
                    {connection.skills.join(", ")}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConnectionsList;
