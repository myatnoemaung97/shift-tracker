import { deleteShift } from "@/app/lib/actions/shifts";
import { Trash2 } from 'lucide-react';

export function DeleteShiftButton({
  id,
  year,
  month,
}: {
  id: string;
  year: number;
  month: number;
}) {
  const action = deleteShift.bind(null, id, year, month);

  return (
    <form action={action}>
      <button
        type="submit"
        className="flex gap-2 w-full text-left px-2 py-1.5 text-xs hover:bg-accent rounded-sm cursor-pointer"
      >
        <Trash2 className="size-3" />
        削除
      </button>
    </form>
  );
}
