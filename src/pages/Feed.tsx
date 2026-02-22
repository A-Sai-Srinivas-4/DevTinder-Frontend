import { useAppDispatch, useAppSelector } from "@/appStore/hooks";
import { removeFeed, setFeed } from "@/appStore/slices/feedSlice";
import UserCard from "@/components/ui/UserCard";
import { api } from "@/services/api";
import { endpoints } from "@/utils/endpoints";
import { useEffect } from "react";

const Feed = () => {
  const feed = useAppSelector((state) => state.feed);
  const dispatch = useAppDispatch();

  const getFeed = async () => {
    try {
      const res = await api.get(endpoints.feed);

      dispatch(setFeed(res.data?.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    if (feed.length === 0) getFeed();
  }, []);

  const handleAction = async (
    userId: string,
    status: "interested" | "ignore",
  ) => {
    try {
      await api.post(`${endpoints.requestSend}/${status}/${userId}`);
      dispatch(removeFeed({ _id: userId }));
    } catch (err) {
      console.error(err);
    }
  };

  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">No Users yet</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      {feed.length > 0 && (
        <UserCard data={feed[0]} handleAction={handleAction} />
      )}
    </div>
  );
};

export default Feed;
