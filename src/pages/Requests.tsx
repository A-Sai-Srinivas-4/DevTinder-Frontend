import { useAppDispatch, useAppSelector } from "@/appStore/hooks";
import { removeRequests, setRequests } from "@/appStore/slices/requestSlice";
import List from "@/components/ui/List";
import { api } from "@/services/api";
import { endpoints } from "@/utils/endpoints";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((state) => state.requests);

  const getRequests = async () => {
    try {
      const res = await api.get(endpoints.requests);
      dispatch(setRequests(res.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (requests.length === 0) {
      getRequests();
    }
  }, []);

  const handleAction = async (
    requestId: string,
    status: "accepted" | "rejected",
  ) => {
    try {
      await api.post(`${endpoints.reviewRequest}/${status}/${requestId}`);
      dispatch(removeRequests({ _id: requestId }));
    } catch (err) {
      console.error(err);
    }
  };

  const requestUsers = requests.map((req) => ({
    ...req.fromUserId,
    requestId: req._id,
  }));

  if (requestUsers.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">No Connection Requests</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Connection Requests</h1>

      <List data={requestUsers} isRequest handleAction={handleAction} />
    </div>
  );
};

export default Requests;
