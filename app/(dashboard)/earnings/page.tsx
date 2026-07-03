// app/(dashboard)/earnings/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { colorMap } from "@/app/lib/colorMap";

const monthlyGoal = 120000;
const estimated = 86450;

const jobs = [
  {
    name: "Lawson",
    color: "red" as const,
    earnings: 32400,
    hours: 24.5,
  },
  {
    name: "Hotel",
    color: "blue" as const,
    earnings: 27000,
    hours: 18,
  },
  {
    name: "Restaurant",
    color: "green" as const,
    earnings: 18050,
    hours: 15,
  },
  {
    name: "Cafe",
    color: "purple" as const,
    earnings: 9000,
    hours: 8,
  },
];

const history = [
  {
    month: "2026年6月",
    earnings: 118200,
    hours: 92,
  },
  {
    month: "2026年5月",
    earnings: 105300,
    hours: 84,
  },
  {
    month: "2026年4月",
    earnings: 113900,
    hours: 89,
  },
];

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Summary */}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>今月の予想給与</CardDescription>
            <CardTitle className="text-3xl">
              ¥{estimated.toLocaleString()}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Progress value={(estimated / monthlyGoal) * 100} />

            <p className="mt-2 text-sm text-muted-foreground">
              目標 ¥{monthlyGoal.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>今月の勤務時間</CardDescription>
            <CardTitle className="text-3xl">65.5 時間</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              登録済みシフトから計算
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>平均時給</CardDescription>
            <CardTitle className="text-3xl">¥1,320</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              全勤務先の平均
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Job breakdown */}

      <Card>
        <CardHeader>
          <CardTitle>勤務先別の収入</CardTitle>
          <CardDescription>
            今月の勤務先ごとの勤務時間と予想給与
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.name}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`size-3 rounded-full ${colorMap[job.color].background}`}
                />

                <div>
                  <p className="font-medium">{job.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {job.hours} 時間
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ¥{job.earnings.toLocaleString()}
                </p>

                <p className="text-sm text-muted-foreground">
                  予想給与
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* History */}

      <Card>
        <CardHeader>
          <CardTitle>給与履歴</CardTitle>
          <CardDescription>
            月ごとの勤務時間と給与
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b text-muted-foreground">
                <tr>
                  <th className="py-3 text-left">月</th>
                  <th className="py-3 text-right">勤務時間</th>
                  <th className="py-3 text-right">給与</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr
                    key={item.month}
                    className="border-b last:border-none"
                  >
                    <td className="py-4">{item.month}</td>

                    <td className="py-4 text-right">
                      {item.hours} 時間
                    </td>

                    <td className="py-4 text-right font-medium">
                      ¥{item.earnings.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}