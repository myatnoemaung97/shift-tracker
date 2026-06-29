import { FaTriangleExclamation } from "react-icons/fa6";

import { Alert, AlertTitle } from "@/components/ui/alert";

export default function DayLimitWarning() {
  return (
    <div className="grid w-full max-w-md items-start gap-4 mt-1">
      <Alert>
        <FaTriangleExclamation className="!text-yellow-500" />
        <AlertTitle className="text-xs text-red-500 font-bold">
          1日の勤務時間は8時間までです。シフトを調整してください。
        </AlertTitle>
      </Alert>
    </div>
  );
}
