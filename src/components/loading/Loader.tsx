import clsx from "clsx";

export default function Loader({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "animate-spin border-4 border-blue-600 border-l-transparent rounded-full w-10 h-10 inline-block",
        className
      )}
    />
  );
}
