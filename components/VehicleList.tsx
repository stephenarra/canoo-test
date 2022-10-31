import { useEffect, useState } from "react";
import { getVehicles, IVehicle } from "../libs/swapi";
import VehicleItem from "./VehicleItem";

const VehicleList = ({
  onFilmSelect,
}: {
  onFilmSelect: (id: string) => void;
}) => {
  const [page, setPage] = useState(1);
  const { isLoading, error, metadata, data } = useVehicles({ page });

  if (isLoading) return <div className="p-4">loading</div>;

  return (
    <div className="flex-1 overflow-auto">
      {!!error && <div className="text-red-600">{error}</div>}
      {data.map((vehicle) => (
        <VehicleItem
          key={vehicle.url}
          onFilmSelect={onFilmSelect}
          vehicle={vehicle}
        />
      ))}
      <div className="flex justify-between p-4">
        {metadata.previous ? (
          <button
            className="mr-4"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {`< Previous`}
          </button>
        ) : (
          <div />
        )}
        {metadata.next && (
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {`Next >`}
          </button>
        )}
      </div>
    </div>
  );
};

const useVehicles = ({ page = 1 }: { page: number }) => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [pageInfo, setPageInfo] = useState({ next: false, previous: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getVehicles({ page });
        setVehicles(res.results);
        setPageInfo({ next: !!res.next, previous: !!res.previous });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setError(message);
      }
      setIsLoading(false);
    })();
  }, [page]);

  return {
    data: vehicles,
    metadata: pageInfo,
    isLoading,
    error,
  };
};

export default VehicleList;
