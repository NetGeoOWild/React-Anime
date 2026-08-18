import { LoaderCircle } from "lucide-react";

export function Loader() {
  return (
    <div className="flex justify-center py-10">
      <button
        type="button"
        className="bg-my-accent flex items-center gap-1.5 rounded-[5px] p-2.5"
        disabled
      >
        <LoaderCircle className="animate-spin" />
        <span className="text-lg xl:text-2xl">Loading...</span>
      </button>
    </div>
  );
}
