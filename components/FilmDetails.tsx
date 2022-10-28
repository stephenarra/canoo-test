import { useEffect, useState } from "react";
import { IFilm, getFilm } from "../libs/swapi";
import Detail from "./common/Detail";

const FilmDetails = ({ id }: { id: string }) => {
  const [film, setFilm] = useState<IFilm>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getFilm({ id });
      setFilm(res);
      setIsLoading(false);
    })();
  }, [id]);

  if (isLoading) return <div>loading</div>;
  if (!film) return null;

  return (
    <div className="flex-1 min-h-0 p-4 pt-0 overflow-auto">
      <div className="mb-2 font-bold">{film.title}</div>
      <Detail label="Producer" horizontal={false}>
        {film.producer}
      </Detail>
      <Detail label="Director" horizontal={false}>
        {film.director}
      </Detail>
      <Detail label="Release Date" horizontal={false}>
        {film.release_date}
      </Detail>
      <Detail label="Description" horizontal={false}>
        {film.opening_crawl}
      </Detail>
    </div>
  );
};

export default FilmDetails;
