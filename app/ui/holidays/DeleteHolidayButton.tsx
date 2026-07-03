import { deleteHoliday } from "@/app/lib/actions/holiday";
import { Trash2 } from 'lucide-react';

export default function DeleteHolidayButton({
  id,
}: {
  id: string;
}) {
  const action = deleteHoliday.bind(null, id);

  return (
    <form action={action}>
      <button
        type="submit"
        className="flex gap-2 w-full text-left px-2 text-xs hover:bg-accent rounded-sm cursor-pointer"
      >
        <Trash2 className="size-3" />
        削除
      </button>
    </form>
  );
}
