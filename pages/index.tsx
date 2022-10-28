import { useRouter } from "next/router";
import VehicleList from "../components/VehicleList";
import FilmDetails from "../components/FilmDetails";
import CloseIcon from "../components/common/CloseIcon";

export default function Home() {
  const router = useRouter();
  const selectedFilm = router.query.film as string;

  const handleFilmSelect = (selectedFilm: string | undefined) => {
    let { film, ...query } = router.query;
    if (film !== selectedFilm) {
      if (selectedFilm) {
        query = { ...query, film: selectedFilm };
      }
      router.replace({ query });
    }
  };

  return (
    <div className="container flex flex-col h-screen py-4 mx-auto">
      <div className="my-2 text-2xl">Star Wars Vehicles</div>

      <div className="flex flex-row flex-wrap flex-1 min-h-0 py-4">
        <div className="flex flex-col h-full mr-6 border rounded flex-2">
          <div className="p-4 text-lg text-gray-800">List of Vehicles</div>
          <VehicleList onFilmSelect={handleFilmSelect} />
        </div>
        {!!selectedFilm && (
          <div className="flex flex-col flex-1 h-full border rounded">
            <div className="flex justify-between p-4">
              <div className="text-lg text-gray-800">Film Details</div>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {
                  handleFilmSelect(undefined);
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <FilmDetails id={selectedFilm} />
          </div>
        )}
      </div>
    </div>
  );
}
