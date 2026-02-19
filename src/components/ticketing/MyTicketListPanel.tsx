import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { Card } from "@/components/common/ui/card";
import { CalendarDays, Ticket as TicketIcon, UserRound } from "lucide-react";
import { cn } from "@/components/common/ui/utils";
import type { Ticket } from "@/types/model/ticket.model";

interface StudentSummary {
  studentId: string;
  name: string;
}

interface MyTicketListPanelProps {
  tickets: Ticket[];
  student: StudentSummary;
  loading: boolean;
  errorMessage: string | null;
  onRefresh: () => void;
  onGoTicketing: () => void;
}

const statusDisplayMap: Record<
  Ticket["status"],
  { label: string; badgeClassName: string; stripClassName: string }
> = {
  issued: {
    label: "팔찌 미수령 상태",
    badgeClassName: "border-transparent bg-emerald-100 text-emerald-700",
    stripClassName: "from-emerald-500 to-teal-500",
  },
  used: {
    label: "팔찌 수령 완료",
    badgeClassName: "border-transparent bg-[#ff1493]/15 text-[#c2187a]",
    stripClassName: "from-[#ff1493] to-[#ff4db8]",
  },
  cancelled: {
    label: "예매 취소",
    badgeClassName: "border-transparent bg-slate-200 text-slate-700",
    stripClassName: "from-slate-400 to-slate-500",
  },
  unknown: {
    label: "상태 확인 필요",
    badgeClassName: "border-transparent bg-slate-100 text-slate-700",
    stripClassName: "from-slate-400 to-slate-500",
  },
};

export function MyTicketListPanel({
  tickets,
  student,
  loading,
  errorMessage,
  onRefresh,
  onGoTicketing,
}: MyTicketListPanelProps) {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">내 티켓</h2>
          <p className="mt-0.5 text-sm text-gray-600">예매 내역과 현재 수령 상태를 확인하세요.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-xl border-blue-200 bg-white/90 hover:bg-white"
          >
            새로고침
          </Button>
        </div>
      </div>

      <Card className="grid border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
            <TicketIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-blue-900">보유 티켓</p>
            <p className="text-lg font-semibold text-blue-900">
              총 {tickets.length}매
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 sm:mt-0 sm:justify-end">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-500">티켓 소지자</p>
            <p className="text-sm font-semibold text-gray-900">
              {student.name} ({student.studentId})
            </p>
          </div>
        </div>
      </Card>

      {tickets.map((ticket) => {
        const status = statusDisplayMap[ticket.status];
        const queue = ticket.queueNumber ?? ticket.id;

        return (
          <Card key={ticket.id} className="overflow-hidden border-blue-100 bg-white/95 shadow-sm shadow-blue-100/60">
            <div className={cn("h-1.5 bg-gradient-to-r", status.stripClassName)} />
            <div className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {ticket.eventName || "공연 티켓"}
                  </h3>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-blue-700">
                    <CalendarDays className="h-4 w-4" />
                    {ticket.eventDate || "일정 추후 공지"}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {ticket.eventDescription || ticket.seat || "좌석 정보 추후 안내"}
                  </p>
                </div>

                <div className="flex items-center gap-3 md:flex-col md:items-end">
                  <Badge className={status.badgeClassName}>{status.label}</Badge>
                  <p className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    순번 #{queue}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      {errorMessage && (
        <Card className="border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </Card>
      )}

      {loading && tickets.length === 0 && (
        <Card className="p-6">
          <p className="text-sm text-gray-600">티켓을 불러오는 중입니다...</p>
        </Card>
      )}

      {!loading && tickets.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-base font-semibold text-gray-900">
            아직 예매한 티켓이 없습니다.
          </p>
          <p className="mt-1 text-sm text-gray-600">
            티켓팅 페이지에서 진행 중인 공연을 확인하세요.
          </p>
          <Button
            className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
            onClick={onGoTicketing}
          >
            티켓팅 하러가기
          </Button>
        </Card>
      )}
    </div>
  );
}
