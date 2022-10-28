import { LocalCache, LocalStorageCache } from "./LocalCache";

export interface IVehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[] | IFilm[];
  created: Date;
  edited: Date;
  url: string;

  // programmatically added
  createdDateString: string;
}

export interface IFilm {
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date;
  edited: Date;
  url: string;

  // programmatically added
  id: string;
}

interface BaseSearchResponse {
  count: number;
  next: string;
  previous: string;
}

interface VehicleSearchResponse extends BaseSearchResponse {
  results: IVehicle[];
}

const BASE_URL = "https://swapi.dev/api";
const cache = new (
  process.env.NODE_ENV === "production" ? LocalCache : LocalStorageCache
)<object>();

const makeRequest = async (url: string) => {
  const headers = { headers: { accept: "application/json" } };
  return fetch(url, headers).then((res) => res.json());
};

const makeCachedRequest = async (url: string) => {
  const cached = cache.getItem(url);
  if (cached) {
    return cached;
  }
  const result = await makeRequest(url);
  cache.setItem(url, result);
  return result;
};

const getFilmIdFromUrl = (url: string) => {
  var res = url.match(/\/films\/(\d+)/);
  if (res?.length === 2) return res[1];
  return null;
};

/**
 * Resolve films in list of vehicle objects
 * - does the api support a better method for resolving multiple films?
 */
const _populateVehicleFilms = async (vehicles: IVehicle[]) => {
  // get unique set of films to resolve
  const films: { [key: string]: boolean } = {};
  vehicles.map((vehicle) =>
    vehicle.films.map((id) => {
      films[id as string] = true;
    })
  );
  const filmIds = Object.keys(films);

  // resolve and create lookup map
  const resolvedFilms = await Promise.all(
    filmIds.map(async (url) => {
      const film = await makeCachedRequest(url);
      const id = getFilmIdFromUrl(url);
      return { ...film, id };
    })
  );
  const filmMap: { [key: string]: IFilm } = resolvedFilms.reduce(
    (obj, film) => ({ ...obj, [film.url]: film }),
    {}
  );

  // populate resolved films
  return vehicles.map((vehicle) => ({
    ...vehicle,
    films: vehicle.films.map((id) => filmMap[id as string]),
  }));
};

export const getVehicles = async ({
  page = 1,
}: {
  page?: number;
}): Promise<VehicleSearchResponse> => {
  const res = await makeCachedRequest(`${BASE_URL}/vehicles?page=${page}`);
  const results = await _populateVehicleFilms(res.results);
  return {
    ...res,
    results: results.map((vehicle) => ({
      ...vehicle,
      createdDateString: new Date(vehicle.created).toLocaleString("en-US"),
    })),
  };
};

export const getFilm = async ({
  id,
}: {
  id: string | number;
}): Promise<IFilm> => {
  const film = await makeCachedRequest(`${BASE_URL}/films/${id}/`);
  return { ...film, id };
};
