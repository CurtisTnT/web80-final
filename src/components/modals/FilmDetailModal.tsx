import { Ref } from "react";

import Modal, { ModalRef } from "./Modal";
import { Film } from "@/interface";
import { FaPlay } from "react-icons/fa";

type Props = {
  modalRef: Ref<ModalRef>;
  film: Film;
};

export default function FilmDetailModal(props: Props) {
  const { modalRef, film } = props;
  const { image, name, time, year, introduce } = film;

  return (
    <Modal ref={modalRef} size="lg">
      <div className="min-h-[530px] mt-5">
        <div className="absolute -top-20 -left-20">
          <img
            src={image}
            alt="film-image"
            className="w-[400px] h-[600px] object-cover rounded-2xl"
          />
        </div>
        <div className="ml-[360px] mr-5 space-y-7">
          <div>
            <h1 className="text-4xl">{name}</h1>

            <div className="text-sm font-medium text-gray-400">
              {time} min {year}
            </div>
          </div>

          <p className="font-medium">{introduce}</p>

          <button
            type="button"
            className="flex items-center gap-2.5 px-5 py-2 rounded-3xl bg-gradient-to-r from-[#e67821] to-[#fc882f] text-white text-sm font-semibold hover:opacity-80"
          >
            <FaPlay size={12} />
            PLAY MOVIE
          </button>
        </div>
      </div>
    </Modal>
  );
}
