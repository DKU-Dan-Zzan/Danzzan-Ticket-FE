import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/components/common/ui/utils";

type AuthTab = "login" | "signup";

interface AuthSegmentedControlProps {
  activeTab: AuthTab;
}

const getTabIndex = (tab: AuthTab): number => (tab === "login" ? 0 : 1);

export function AuthSegmentedControl({ activeTab }: AuthSegmentedControlProps) {
  const location = useLocation();
  const activeIndex = getTabIndex(activeTab);
  const [indicatorIndex, setIndicatorIndex] = useState(activeIndex);

  useEffect(() => {
    const from = (location.state as { authTabFrom?: AuthTab } | null)?.authTabFrom;

    if (!from || from === activeTab) {
      setIndicatorIndex(activeIndex);
      return;
    }

    setIndicatorIndex(getTabIndex(from));
    const rafId = window.requestAnimationFrame(() => {
      setIndicatorIndex(activeIndex);
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [activeIndex, activeTab, location.state]);

  return (
    <div className="relative grid grid-cols-2 rounded-2xl border border-[#9dc0f4] bg-[#dbe7f7] p-1">
      <div
        className="absolute left-1 top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-xl border border-[#d7e6ff] bg-white shadow-[0_12px_20px_-16px_rgba(37,99,235,0.35)] transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${indicatorIndex * 100}%)` }}
      />

      <Link
        to="/login"
        state={{ authTabFrom: activeTab }}
        className={cn(
          "relative z-10 flex min-h-11 items-center justify-center rounded-xl px-3 text-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40",
          activeTab === "login" ? "text-[#2563eb]" : "text-[#374151] hover:text-[#1f2937]",
        )}
      >
        로그인
      </Link>
      <Link
        to="/signup"
        state={{ authTabFrom: activeTab }}
        className={cn(
          "relative z-10 flex min-h-11 items-center justify-center rounded-xl px-3 text-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40",
          activeTab === "signup" ? "text-[#2563eb]" : "text-[#374151] hover:text-[#1f2937]",
        )}
      >
        회원가입
      </Link>
    </div>
  );
}
