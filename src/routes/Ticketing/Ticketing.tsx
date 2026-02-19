import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReservationSuccessPanel } from "@/components/ticketing/ReservationSuccessPanel";
import { TicketingEventListPanel } from "@/components/ticketing/TicketingEventListPanel";
import { TicketingHomePanel } from "@/components/ticketing/TicketingHomePanel";
import { TicketingReservationPanel } from "@/components/ticketing/TicketingReservationPanel";
import { useTicketing } from "@/hooks/useTicketing";
import type { TicketingEvent } from "@/types/model/ticket.model";

const RESERVATION_LIMIT_SECONDS = 180;

type TicketingStep = "home" | "list" | "in-progress" | "success";

const generateCaptcha = (): string => {
  const randomText = Math.random().toString(36).slice(2, 8);
  return randomText.toUpperCase();
};

export default function Ticketing() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    loading,
    reservationLoading,
    error,
    clearError,
    getTicketingEvents,
    reserveTicket,
  } = useTicketing();

  const [step, setStep] = useState<TicketingStep>("home");
  const [events, setEvents] = useState<TicketingEvent[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const [selectedEvent, setSelectedEvent] = useState<TicketingEvent | null>(null);
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [reservationSeconds, setReservationSeconds] = useState(RESERVATION_LIMIT_SECONDS);
  const [reservationTimedOut, setReservationTimedOut] = useState(false);
  const [reservationError, setReservationError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    const fetched = await getTicketingEvents();
    setEvents(fetched);
  }, [getTicketingEvents]);

  useEffect(() => {
    if (step !== "list") {
      return;
    }

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [step]);

  useEffect(() => {
    if (step !== "in-progress") {
      return;
    }

    setReservationSeconds(RESERVATION_LIMIT_SECONDS);
    setReservationTimedOut(false);

    const intervalId = window.setInterval(() => {
      setReservationSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          setReservationTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [step, selectedEvent?.id]);

  const resetReservationState = useCallback(() => {
    setSelectedEvent(null);
    setCaptchaInput("");
    setCaptchaCode(generateCaptcha());
    setReservationTimedOut(false);
    setReservationSeconds(RESERVATION_LIMIT_SECONDS);
    setReservationError(null);
  }, []);

  useEffect(() => {
    const state = location.state as { resetToHome?: number } | null;
    if (!state?.resetToHome) {
      return;
    }

    clearError();
    resetReservationState();
    setStep("home");
  }, [location.state, clearError, resetReservationState]);

  const moveToList = useCallback(async () => {
    clearError();
    setStep("list");
    await loadEvents();
  }, [clearError, loadEvents]);

  const handleOpenList = () => {
    void moveToList();
  };

  const handleRefreshList = () => {
    void loadEvents();
  };

  const handleStartReservation = (event: TicketingEvent) => {
    clearError();
    setSelectedEvent(event);
    setCaptchaInput("");
    setCaptchaCode(generateCaptcha());
    setReservationError(null);
    setStep("in-progress");
  };

  const handleSubmitReservation = async () => {
    if (!selectedEvent) {
      return;
    }

    if (reservationTimedOut) {
      setReservationError("예매 가능 시간이 종료되었습니다.");
      return;
    }

    if (!captchaInput.trim()) {
      setReservationError("보안문자를 입력해주세요.");
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setReservationError("보안문자가 일치하지 않습니다.");
      return;
    }

    setReservationError(null);
    clearError();

    const reservation = await reserveTicket(selectedEvent.id, captchaInput.trim().toUpperCase());
    if (!reservation) {
      setReservationError("예매에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== selectedEvent.id) {
          return event;
        }

        if (event.remainingCount === null) {
          return event;
        }

        return {
          ...event,
          remainingCount: Math.max(event.remainingCount - 1, 0),
        };
      }),
    );
    setStep("success");
  };

  const handleTimeoutConfirm = () => {
    resetReservationState();
    void moveToList();
  };

  const handleSuccessBackToList = () => {
    resetReservationState();
    void moveToList();
  };

  if (step === "home") {
    return (
      <TicketingHomePanel
        onOpenTicketingList={handleOpenList}
        onOpenMyTickets={() => navigate("/myticket")}
      />
    );
  }

  if (step === "list") {
    return (
      <TicketingEventListPanel
        events={events}
        loading={loading}
        errorMessage={error?.message ?? null}
        now={now}
        onRefresh={handleRefreshList}
        onSelectEvent={handleStartReservation}
      />
    );
  }

  if (step === "in-progress") {
    return (
      <TicketingReservationPanel
        eventTitle={selectedEvent?.title ?? ""}
        captchaCode={captchaCode}
        captchaInput={captchaInput}
        remainingSeconds={reservationSeconds}
        submitting={reservationLoading}
        timedOut={reservationTimedOut}
        errorMessage={reservationError}
        onCaptchaInputChange={setCaptchaInput}
        onSubmit={handleSubmitReservation}
        onTimeoutConfirm={handleTimeoutConfirm}
      />
    );
  }

  return (
    <ReservationSuccessPanel
      onGoMyTickets={() => navigate("/myticket")}
      onBackToList={handleSuccessBackToList}
    />
  );
}
