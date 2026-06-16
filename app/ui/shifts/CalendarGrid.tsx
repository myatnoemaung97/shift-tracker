import { useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function Calendar() {
  const searchParams = useSearchParams();
  const urlYear = Number(searchParams.get("year"));
  const urlMonth = Number(searchParams.get("month"));

  const daysInAWeek: Array<{ day: number; name: string }> = [
    { day: 0, name: "日" },
    { day: 1, name: "月" },
    { day: 2, name: "火" },
    { day: 3, name: "水" },
    { day: 4, name: "木" },
    { day: 5, name: "金" },
    { day: 6, name: "土" },
  ];

  function cellIndexToDate(cellIndex: number, year: number, month: number) {
    const firstDay = new Date(year, month, 1);

    const firstVisibleDate = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate() - firstDay.getDay(),
    );

    const date = new Date(firstVisibleDate);
    date.setDate(firstVisibleDate.getDate() + cellIndex);

    return date;
  }

  const cells = Array.from({ length: 42 }, (_, i) => ({
    index: i,
    date: cellIndexToDate(i, urlYear, urlMonth - 1),
  }));

  const testCell = cellIndexToDate(37, urlYear, urlMonth - 1);

  console.log(`${testCell.getMonth()}/${testCell.getDate()}`);

  return (
    <>
      <div className="grid grid-cols-7 gap-2">
        {daysInAWeek.map(({ day, name }) => (
          <div
            className={clsx("font-semibold text-center", {
              "text-red-500": day === 0 || day === 6,
            })}
            key={day}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map(({ index, date }) => (
          <div className="text-center text-sm" key={index}>
            {date.getMonth() + 1}/{date.getDate()}({index})
          </div>
        ))}
      </div>
    </>
  );
}
