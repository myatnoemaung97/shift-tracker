import { IconType } from "react-icons";

export default function JobInfoCard({
  Icon,
  label,
  value,
}: {
  Icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center justify-center bg-gray-100 text-gray-500 p-2 rounded-full text-sm">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-bold text-md md:text-lg">{value}</span>
    </div>
  );
}
