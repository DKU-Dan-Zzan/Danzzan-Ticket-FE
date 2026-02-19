import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import { Card } from "@/components/common/ui/card";

interface ReservationSuccessPanelProps {
  onGoMyTickets: () => void;
  onBackToList: () => void;
}

export function ReservationSuccessPanel({
  onGoMyTickets,
  onBackToList,
}: ReservationSuccessPanelProps) {
  return (
    <div className="mx-auto flex w-full max-w-xl items-center justify-center pb-6">
      <Card className="relative w-full overflow-hidden border-emerald-100 bg-white/95 p-8 text-center shadow-lg shadow-emerald-100/70">
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-200/40 blur-xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-blue-200/40 blur-xl" />

        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200">
          <CheckCircle2 className="h-12 w-12" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-gray-900">티켓팅 성공</h2>
        <p className="mt-2 text-sm text-gray-600">
          예매가 완료되었습니다. 내 티켓에서 상세 정보를 확인하세요.
        </p>

        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          <Button
            variant="outline"
            onClick={onBackToList}
            className="rounded-xl border-slate-300 bg-white hover:bg-slate-50"
          >
            다른 일정 보기
          </Button>
          <Button
            onClick={onGoMyTickets}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
          >
            내 티켓 확인하기
          </Button>
        </div>
      </Card>
    </div>
  );
}
