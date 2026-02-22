import { useAppDispatch, useAppSelector } from "@/appStore/hooks";
import { setConnections } from "@/appStore/slices/connectionSlice";
import ConnectionsList from "@/components/ui/ConnectionsList";
import { api } from "@/services/api";
import { endpoints } from "@/utils/endpoints";
import { useEffect } from "react";

const Connections = () => {
  const dispatch = useAppDispatch();
  const connections = useAppSelector((state) => state.connections);
  const getConnections = async () => {
    try {
      const res = await api.get(endpoints.connections);
      dispatch(setConnections(res.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  console.log("connections", connections);

  useEffect(() => {
    if (connections.length === 0) getConnections();
  }, []);

  if (!connections) {
    return <div>Loading...</div>;
  }

  if (connections.length === 0) {
    return <div>No connections found</div>;
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <h1 className="text-center text-3xl font-bold text-white">Connections</h1>

      {connections.length > 0 && <ConnectionsList connections={connections} />}
    </div>
  );
};

export default Connections;
