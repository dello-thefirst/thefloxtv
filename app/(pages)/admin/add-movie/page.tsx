"use client";
import Header from "@/app/components/Header";
import { uploadMovie } from "@/app/functions/admin";
import { useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = async (formData: FormData) => {
    const tmdb_id = await formData.get("id");
    const tmdb_id_string = tmdb_id ? tmdb_id.toString() : "";
    try {
      setIsLoading(true);
      const uploadResponse = await uploadMovie(tmdb_id_string);
      console.log(uploadResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header page="admin" />
      <main className="w-full h-[85%] center-div">
        <form
          action={handleAdd}
          className="w-[350px] h-[300px] rounded-lg drop-shadow-2xl bg-[rgba(var(--background-color-2))] flex flex-col gap-5 items-center justify-center p-10"
        >
          <input
            className="input w-full h-[40px] rounded-md pl-5 text-[13px]"
            type="text"
            name="id"
            placeholder="IMDB / TMDB ID"
          />
          <button
            type="submit"
            className="w-[150px] h-[35px] rounded-md bg-blue-900"
          >
            {isLoading && (
              <i className="fa-duotone fa-spin fa-spinner-third"></i>
            )}
            {!isLoading && "Add Movie"}
          </button>
        </form>
      </main>
    </>
  );
};
export default Page;
