import { CalendarClock, Clock3, RefreshCw } from "lucide-react";
import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { Card } from "@/components/common/ui/card";
import { cn } from "@/components/common/ui/utils";
import type { TicketingEvent } from "@/types/model/ticket.model";

interface TicketingEventListPanelProps {
  events: TicketingEvent[];
  loading: boolean;
  errorMessage: string | null;
  now: number;
  onRefresh: () => void;
  onSelectEvent: (event: TicketingEvent) => void;
}

type EventViewStatus = "upcoming" | "open" | "soldout";

const statusMeta: Record<
  EventViewStatus,
  {
    label: string;
    badgeClassName: string;
    cardClassName: string;
  }
> = {
  upcoming: {
    label: "오픈 예정",
    badgeClassName: "border-transparent bg-slate-100 text-slate-700",
    cardClassName: "border-blue-100 bg-white/95",
  },
  open: {
    label: "실시간 예매 중",
    badgeClassName: "border-transparent bg-emerald-100 text-emerald-700",
    cardClassName: "border-emerald-200 bg-gradient-to-r from-emerald-50/90 to-white",
  },
  soldout: {
    label: "전석 매진",
    badgeClassName: "border-transparent bg-slate-200 text-slate-700",
    cardClassName: "border-slate-200 bg-slate-50/80",
  },
};

const parseTimestamp = (value: string): number | null => {
  if (!value) {
    return null;
  }
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
};

const formatCountdown = (seconds: number): string => {
  const clamped = Math.max(0, seconds);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const sec = clamped % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(sec).padStart(2, "0"),
  ].join(":");
};

const resolveViewStatus = (
  event: TicketingEvent,
  openAtMs: number | null,
  now: number,
): EventViewStatus => {
  if (event.status === "soldout" || event.remainingCount === 0) {
    return "soldout";
  }

  if (openAtMs !== null && now < openAtMs) {
    return "upcoming";
  }

  if (event.status === "upcoming" && openAtMs === null) {
    return "upcoming";
  }

  return "open";
};

const formatEventDateTime = (event: TicketingEvent, openAtMs: number | null): string => {
  const eventDateTime = [event.eventDate, event.eventTime].filter(Boolean).join(" ");
  if (eventDateTime) {
    return eventDateTime;
  }

  if (openAtMs === null) {
    return "오픈 일정 추후 공지";
  }

  return new Date(openAtMs).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function TicketingEventListPanel({
  events,
  loading,
  errorMessage,
  now,
  onRefresh,
  onSelectEvent,
}: TicketingEventListPanelProps) {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">티켓팅</h2>
          <p className="mt-0.5 text-sm text-gray-600">공연별 오픈 시간과 잔여 좌석을 확인하세요.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-xl border-blue-200 bg-white/90 hover:bg-white"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            새로고침
          </Button>
        </div>
      </div>

      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
            <CalendarClock className="h-4 w-4" />
          </div>
          <p className="text-sm text-blue-900">
            오픈 10분 전부터 카운트다운이 시작되며, 0초 이후 예매 버튼이 활성화됩니다.
          </p>
        </div>
      </Card>

      {errorMessage && (
        <Card className="border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </Card>
      )}

      {loading && events.length === 0 && (
        <Card className="p-6">
          <p className="text-sm text-gray-600">티켓 정보를 불러오는 중입니다...</p>
        </Card>
      )}

      {!loading && events.length === 0 && (
        <Card className="p-6">
          <p className="text-sm text-gray-600">진행 중인 티켓팅 일정이 없습니다.</p>
        </Card>
      )}

      {events.map((event) => {
        const openAtMs = parseTimestamp(event.ticketOpenAt);
        const status = resolveViewStatus(event, openAtMs, now);
        const currentStatusMeta = statusMeta[status];
        const countdown =
          status === "upcoming" && openAtMs !== null
            ? Math.max(0, Math.floor((openAtMs - now) / 1000))
            : 0;

        return (
          <Card
            key={event.id}
            className={cn(
              "relative overflow-hidden p-6 shadow-sm shadow-blue-100/60",
              currentStatusMeta.cardClassName,
            )}
          >
            {status === "open" && (
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-200/50 blur-xl" />
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {event.title || "공연 티켓팅"}
                </h3>
                <p className="mt-1 text-sm font-medium text-blue-700">
                  {formatEventDateTime(event, openAtMs)}
                </p>
              </div>
              <Badge className={currentStatusMeta.badgeClassName}>
                {currentStatusMeta.label}
              </Badge>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <p>
                잔여 좌석: {event.remainingCount ?? "-"}
                {event.totalCount ? ` / ${event.totalCount}` : ""}
              </p>
              <p>공연 ID: {event.id || "-"}</p>
            </div>

            <div className="mt-4">
              {status === "upcoming" && openAtMs !== null && (
                <Button
                  className="w-full rounded-xl border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-100"
                  variant="outline"
                  disabled
                >
                  <Clock3 className="h-4 w-4" />
                  오픈까지 {formatCountdown(countdown)}
                </Button>
              )}

              {status === "upcoming" && openAtMs === null && (
                <Button className="w-full rounded-xl" variant="secondary" disabled>
                  오픈 예정
                </Button>
              )}

              {status === "open" && (
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600"
                  onClick={() => onSelectEvent(event)}
                >
                  단국존 선착순 예매
                </Button>
              )}

              {status === "soldout" && (
                <Button
                  className="w-full rounded-xl border-slate-300 bg-slate-200 text-slate-600 hover:bg-slate-200"
                  variant="outline"
                  disabled
                >
                  정원 초과로 신청 마감
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
