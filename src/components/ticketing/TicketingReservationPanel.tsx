import { ShieldQuestion, Timer } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import { Card } from "@/components/common/ui/card";
import { Input } from "@/components/common/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/common/ui/alert-dialog";

interface TicketingReservationPanelProps {
  eventTitle: string;
  captchaCode: string;
  captchaInput: string;
  remainingSeconds: number;
  submitting: boolean;
  timedOut: boolean;
  errorMessage: string | null;
  onCaptchaInputChange: (value: string) => void;
  onSubmit: () => void;
  onTimeoutConfirm: () => void;
}

const formatTimer = (seconds: number): string => {
  const clamped = Math.max(0, seconds);
  const min = Math.floor(clamped / 60);
  const sec = clamped % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

export function TicketingReservationPanel({
  eventTitle,
  captchaCode,
  captchaInput,
  remainingSeconds,
  submitting,
  timedOut,
  errorMessage,
  onCaptchaInputChange,
  onSubmit,
  onTimeoutConfirm,
}: TicketingReservationPanelProps) {
  return (
    <div className="mx-auto w-full max-w-xl space-y-4 pb-6">
      <div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">예매 진행 중</h2>
          <p className="mt-0.5 text-sm text-gray-600">보안문자를 입력해 예매를 완료하세요.</p>
        </div>
      </div>

      <Card className="border-blue-100 bg-white/95 p-6 shadow-sm shadow-blue-100/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-700">
            선택한 티켓:{" "}
            <span className="font-semibold text-gray-900">
              {eventTitle || "공연 티켓"}
            </span>
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
            <Timer className="h-4 w-4" />
            남은 시간 {formatTimer(remainingSeconds)}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <ShieldQuestion className="h-4 w-4 text-blue-600" />
              보안문자 입력
            </p>
            <div className="rounded-2xl border border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-5 text-center text-2xl font-bold tracking-[0.4em] text-blue-700 shadow-inner">
              <span className="drop-shadow-sm">{captchaCode}</span>
            </div>
          </div>

          <Input
            value={captchaInput}
            onChange={(event) => onCaptchaInputChange(event.target.value.toUpperCase())}
            placeholder="위 보안문자를 입력하세요"
            maxLength={6}
            disabled={submitting || timedOut}
            className="h-11 rounded-xl border-blue-200 bg-white"
          />

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          <Button
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
            onClick={onSubmit}
            disabled={submitting || timedOut || !captchaInput.trim()}
          >
            {submitting ? "예매 처리 중..." : "예매 완료"}
          </Button>
        </div>
      </Card>

      {timedOut && (
        <AlertDialog open={timedOut}>
          <AlertDialogContent className="max-w-sm border-red-100 shadow-2xl">
            <AlertDialogHeader className="space-y-3 text-center sm:text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-red-400">TIME OUT</p>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                예매 시간이 종료되었습니다
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600">
                다시 티켓 목록으로 돌아가 현재 상태를 확인해주세요.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-center">
              <AlertDialogAction
                className="h-11 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                onClick={onTimeoutConfirm}
              >
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
