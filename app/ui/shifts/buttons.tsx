import { FaPlus } from "react-icons/fa6";

export function CreateShift() {
  return (
    <button className="flex items-center px-5 py-3 bg-indigo-500 text-white cursor-pointer rounded-md hover:bg-indigo-600 transition-colors">
      <FaPlus className="size-3 md:size-4" />
      <span>シフトを追加</span>
    </button>
  );
}
