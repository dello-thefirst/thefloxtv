import { getLetterRange, getWordRange } from "./Functions";
import { useQuery } from "react-query";
import { getMovieDetails, getSeriesDetails } from "../app/functions/fetch";

export default function TrendingLabel({ id, type }: { id: any; type: string }) {
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      type == "movie" ? await getMovieDetails(id) : await getSeriesDetails(id),
    queryKey: [type, id],
  });

  if (isLoading) {
    return <p className="skeleton h-2 rounded-md w-full"></p>;
  }
  return (
    <>
      <div className="w-full flex gap-2 text-[12px]  items-center justify-between px-[1px] py-2">
        <p>
          {type == "movie"
            ? getLetterRange(data.release_date, 4)
            : getLetterRange(data.first_air_date, 4)}
        </p>
        <p className="border border-[grey] rounded-lg px-[5px] py-[0.5px] ">
          {type}
        </p>
        <p>
          {type == "movie"
            ? data.runtime + ` min`
            : `Season ${
                data.last_episode_to_air?.season_number
                  ? data.last_episode_to_air?.season_number
                  : "?"
              }`}
        </p>
      </div>
      <div>
        <p
          className="text-[14px] sm:text-[12px] text-[lightgrey] w-full whitespace-nowrap overflow-ellipsis overflow-hidden"
          style={{
            textShadow: "0.5px 0.5px 0.5px black",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {type == "movie" ? data.title : data.name}
        </p>
      </div>
    </>
  );
}
