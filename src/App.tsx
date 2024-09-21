import { useEffect, useRef, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import "./App.css";
import ComponentSpinner from "./components/loading/ComponentSpinner";
import { ModalRef } from "./components/modals/Modal";
import { Film } from "./interface";
import { initialFilm } from "./initialState";
import FilmDetailModal from "./components/modals/FilmDetailModal";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film>(initialFilm);

  const detailModalRef = useRef<ModalRef>(null);

  const handleOpenFilmDetail = (film: Film) => {
    setSelectedFilm(film);
    detailModalRef.current?.open();
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(apiUrl).then((res) => res.json());
        setLoading(false);
        setFilms(res.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#ffda68] to-[#ffae4a] text-[#646978]">
      <div className="w-[calc(100vw/2)] bg-white rounded-2xl shadow-lg">
        <ComponentSpinner isLoading={loading}>
          <div className="flex items-center justify-between p-7 border-b-2">
            <button type="button" className="hover:opacity-80">
              <IoMenuOutline size={30} className="shrink-0" />
            </button>

            <div className="flex items-center gap-1">
              <h2 className="text-3xl font-medium text-[#383c47]">MOVIE</h2>
              <span className="px-2 py-1 rounded-full bg-[#f16017] text-xl text-white shrink-0">
                UI
              </span>
            </div>
            <button type="button" className="hover:opacity-80">
              <IoSearch size={30} className="shrink-0" />
            </button>
          </div>

          <div className="p-7">
            <h2 className="text-2xl font-medium">Most Popular Movies</h2>

            <div className="grid grid-cols-4 gap-7 mt-5 mb-2">
              {films.map((film) => {
                const { ID, image, name, time, year } = film;
                return (
                  <div
                    key={ID}
                    className="col-span-1 cursor-pointer hover:scale-105 duration-300 rounded-md"
                    onClick={() => handleOpenFilmDetail(film)}
                  >
                    <img
                      src={image}
                      alt="film-image"
                      className="w-full h-[300px] object-cover rounded-md"
                    />

                    <h1 className="mt-2 font-semibold">{name}</h1>
                    <div className="text-sm font-medium text-gray-400">
                      {time} min {year}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ComponentSpinner>
      </div>

      <FilmDetailModal modalRef={detailModalRef} film={selectedFilm} />
    </main>
  );
}

export default App;
