import {
  forwardRef,
  PropsWithChildren,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import clsx from "clsx";

import ComponentSpinner from "@/components/loading/ComponentSpinner";

export type ModalRef = {
  open: () => void;
  close: () => void;
  onLoading: (loading: boolean) => void;
};

type Props = {
  header?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
};

function Modal(props: PropsWithChildren<Props>, forwardRef: Ref<ModalRef>) {
  const { header, footer, size = "sm", children } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(forwardRef, () => ({
    open: () => setIsOpenModal(true),
    close: () => setIsOpenModal(false),
    onLoading: setLoading,
  }));

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Dialog
        open={isOpenModal}
        onClose={handleCloseModal}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0 backdrop-blur-sm"
        />
        <div className="fixed inset-0 w-screen p-16 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className={clsx(
                "relative bg-white p-5 rounded-2xl w- duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 text-[#646978]",
                {
                  "w-[576px]": size === "sm",
                  "w-[768px]": size === "md",
                  "w-[1024px]": size === "lg",
                  "w-full h-[calc(100vh-128px)]": size === "full",
                }
              )}
            >
              <button
                type="button"
                className="absolute z-10 top-5 right-5 border border-transparent rounded-md text-black hover:opacity-80 hover:border-blue"
                onClick={handleCloseModal}
              >
                <CgClose size={20} />
              </button>

              <ComponentSpinner isLoading={loading}>
                <div>{header}</div>

                <div>{children}</div>

                <div>{footer}</div>
              </ComponentSpinner>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default forwardRef(Modal);
