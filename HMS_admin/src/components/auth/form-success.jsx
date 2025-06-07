import { CheckCircle2 } from "lucide-react";

export default function FormSuccess({ message, className }) {
  return (
    <div className={`rounded-md bg-emerald-50/50 p-4 ${className}`}>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="mt-2 rounded-full bg-emerald-100/80 p-1">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
        </div>
        <p className="text-center text-xs font-medium text-emerald-800">
          {message}
        </p>
        <div className="h-1 w-full overflow-hidden rounded-full bg-emerald-100">
          <div className="h-full animate-progress bg-emerald-500"></div>
        </div>
      </div>
    </div>
  );
}