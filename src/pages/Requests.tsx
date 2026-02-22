import { useAppDispatch, useAppSelector } from "@/appStore/hooks";
import { setRequests } from "@/appStore/slices/requestSlice";
import ConnectionsList from "@/components/ui/ConnectionsList";
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
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const userRequests = requests.map((req) => {
    return req?.fromUserId;
  });

  console.log("userRequests", userRequests);

  useEffect(() => {
    if (requests.length === 0) getRequests();
  }, []);

  if (!requests) {
    return <div>Loading...</div>;
  }

  if (requests.length === 0) {
    return <div>No requests found</div>;
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <h1 className="text-center text-3xl font-bold text-white">
        Connection Requests
      </h1>

      {requests.length > 0 && <ConnectionsList connections={userRequests} isRequest={true} />}
    </div>
  );
};

export default Requests;
