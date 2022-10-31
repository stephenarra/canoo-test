import { rest } from "msw";
import { vehicles, film } from "./data";

export const handlers = [
  rest.get("https://swapi.dev/api/vehicles", (req, res, ctx) => {
    // const page = request.url.searchParams.get("page");
    return res(
      ctx.json({
        count: 39,
        next: `https://swapi.dev/api/vehicles/?page=2`,
        previous: null,
        results: vehicles,
      })
    );
  }),
  rest.get("https://swapi.dev/api/films/:filmId", (req, res, ctx) => {
    const id = req.params.filmId;
    return res(ctx.json({ ...film, url: req.url }));
  }),
];
