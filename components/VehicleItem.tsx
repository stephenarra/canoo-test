import { IVehicle, IFilm } from "../libs/swapi";
import Detail from "./common/Detail";

const VehicleItem = ({
  vehicle,
  onFilmSelect,
}: {
  vehicle: IVehicle;
  onFilmSelect: (id: string) => void;
}) => (
  <div className="px-4 py-2 border-b border-gray-100">
    <div className="font-bold">{vehicle.name}</div>
    <Detail label="Model">{vehicle.model}</Detail>
    <Detail label="Manufacturer">{vehicle.manufacturer}</Detail>
    <Detail label="Created">{vehicle.createdDateString}</Detail>
    <Detail label="Films">
      <div className="flex">
        {vehicle.films.map((film) => {
          const f = film as IFilm;
          return (
            <div
              onClick={() => {
                onFilmSelect(f.id);
              }}
              className="px-2 py-0.5 mr-1 border rounded cursor-pointer hover:bg-gray-100"
              key={f.url}
            >
              {f.title}
            </div>
          );
        })}
      </div>
    </Detail>
  </div>
);

export default VehicleItem;
