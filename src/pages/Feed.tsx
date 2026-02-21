import { useAppDispatch, useAppSelector } from "@/appStore/hooks";
import { setFeed } from "@/appStore/slices/feedSlice";
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
    if (!feed) getFeed();
  }, []);

  return (
    <div className="flex justify-center items-center my-8">
      {feed && <UserCard data={feed[0]} />}
    </div>
  );
};

export default Feed;
