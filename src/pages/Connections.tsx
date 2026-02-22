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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (connections.length === 0) {
      getConnections();
    }
  }, []);

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">No Connections yet</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Connections</h1>

      <ConnectionsList data={connections} />
    </div>
  );
};

export default Connections;
