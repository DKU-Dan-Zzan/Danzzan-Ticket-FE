import { ArrowRight, ClipboardList, Ticket, TicketCheck } from "lucide-react";
import { Card } from "@/components/common/ui/card";

interface TicketingHomePanelProps {
  onOpenTicketingList: () => void;
  onOpenMyTickets: () => void;
}

const guideItems = [
  {
    step: 1,
    title: "티켓팅 오픈 시간 확인",
    description: "티켓 목록에서 각 공연의 오픈 시간을 확인하세요. 오픈 10분 전부터 카운트다운이 시작됩니다.",
  },
  {
    step: 2,
    title: "대기 및 예매",
    description: "오픈 시각이 되면 예매 버튼이 활성화됩니다.",
  },
  {
    step: 3,
    title: "내 티켓 확인",
    description: "예매가 완료되면 '내 티켓 확인하기'에서 예매한 티켓을 확인하세요.",
  },
  {
    step: 4,
    title: "팔찌 수령",
    description:
      "공연 당일 지정된 장소에서 스태프에게 티켓을 제시하세요. 확인 및 팔찌 배부가 완료되면 내 티켓 상태가 '팔찌 수령 완료'로 업데이트됩니다. (팔찌 배부 위치/시간은 추후 총학생회 인스타그램 공지)",
  },
  {
    step: 5,
    title: "공연 입장",
    description: "팔찌를 착용하고 단국존에 입장하세요.",
  },
];

const noticeItems = [
  "티켓은 예매 시간 순으로 선착순 배정됩니다",
  "1인당 공연별 최대 1매까지 예매 가능합니다",
  "예매한 티켓은 취소가 불가능합니다.",
  "팔찌 미수령 시 단국존 입장이 불가하오니, 수령 시간에 맞추어 입장 팔찌를 수령해가시길 바랍니다.",
];

export function TicketingHomePanel({
  onOpenTicketingList,
  onOpenMyTickets,
}: TicketingHomePanelProps) {
  return (
    <div className="mx-auto w-full max-w-md space-y-5 pb-4">
      <button
        type="button"
        onClick={onOpenTicketingList}
        className="group block w-full text-left focus-visible:outline-none"
      >
        <Card className="min-h-[116px] rounded-[24px] border border-[#4a6fcd] bg-gradient-to-br from-[#2472f5] via-[#1556cf] to-[#0b3ca8] p-4 shadow-[0_18px_34px_-18px_rgba(11,60,168,0.8),0_8px_16px_-10px_rgba(15,23,42,0.34)] transition-all duration-200 group-hover:-translate-y-[1px] group-hover:shadow-[0_22px_38px_-18px_rgba(11,60,168,0.88),0_10px_18px_-10px_rgba(15,23,42,0.38)] group-active:translate-y-[1px] group-active:shadow-[0_12px_22px_-12px_rgba(11,60,168,0.7),0_5px_10px_-8px_rgba(15,23,42,0.3)]">
          <div className="grid min-h-[84px] grid-cols-[60px_1fr_24px] items-center gap-3.5">
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[18px] border border-white/30 bg-white/14 text-white">
              <Ticket className="h-[30px] w-[30px]" strokeWidth={2.1} />
            </div>
            <div className="flex min-h-[56px] flex-col justify-center">
              <h2 className="text-[1.28rem] leading-[1.2] font-bold text-white">공연 티켓팅 하러가기</h2>
              <p className="mt-1 text-[0.96rem] leading-[1.35] font-medium text-white/95">
                새로운 공연 티켓을 예매하세요
              </p>
            </div>
            <ArrowRight
              className="h-6 w-6 shrink-0 text-white transition-transform duration-200 group-active:translate-x-0.5"
              strokeWidth={2.3}
            />
          </div>
        </Card>
      </button>

      <button type="button" onClick={onOpenMyTickets} className="group block w-full text-left">
        <Card className="min-h-[116px] rounded-[24px] border border-[#5a80d6] bg-gradient-to-br from-[#317ff8] via-[#1a62df] to-[#1451bf] p-4 shadow-[0_16px_30px_-18px_rgba(20,81,191,0.72),0_7px_14px_-10px_rgba(15,23,42,0.3)] transition-all duration-200 group-hover:-translate-y-[1px] group-hover:shadow-[0_20px_34px_-18px_rgba(20,81,191,0.78),0_9px_16px_-10px_rgba(15,23,42,0.34)] group-active:translate-y-[1px] group-active:shadow-[0_11px_20px_-12px_rgba(20,81,191,0.62),0_5px_10px_-8px_rgba(15,23,42,0.26)]">
          <div className="grid min-h-[84px] grid-cols-[60px_1fr_24px] items-center gap-3.5">
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[18px] border border-white/30 bg-white/14 text-white">
              <TicketCheck className="h-[30px] w-[30px]" strokeWidth={2.2} />
            </div>
            <div className="flex min-h-[56px] flex-col justify-center">
              <h2 className="text-[1.28rem] leading-[1.2] font-bold text-white">내 티켓 확인하기</h2>
              <p className="mt-1 text-[0.96rem] leading-[1.35] font-medium text-white/95">
                예매한 티켓을 확인하세요
              </p>
            </div>
            <ArrowRight
              className="h-6 w-6 shrink-0 text-white transition-transform duration-200 group-active:translate-x-0.5"
              strokeWidth={2.3}
            />
          </div>
        </Card>
      </button>

      <Card className="rounded-[24px] border border-[#b4cff3] bg-[#f9fcff] p-5 shadow-[0_10px_20px_-16px_rgba(37,99,235,0.35)]">
        <h3 className="flex items-center gap-2 text-[1rem] leading-[1.25] font-bold text-[#111827]">
          <ClipboardList className="h-[17px] w-[17px] text-[#64748b]" strokeWidth={2.1} />
          티켓팅 이용 가이드
        </h3>
        <div className="mt-0 px-2">
          {guideItems.map((item, index) => (
            <section
              key={item.step}
              className={
                index === 0
                  ? "border-b border-[#d8e4f7] pt-0 pb-2"
                  : index === guideItems.length - 1
                    ? "pt-3"
                    : "border-b border-[#d8e4f7] py-3"
              }
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3b82f6] text-[13px] font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <p className="text-[0.96rem] font-bold leading-snug text-[#111827]">{item.title}</p>
                  <p className="mt-1 text-[0.88rem] leading-[1.43] text-[#4b5563]">
                    {item.description}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
        <section className="mt-4 border-t border-[#d8e4f7] pt-4">
          <h4 className="text-[1rem] leading-[1.25] font-bold text-[#1d4ed8]">
            💡 유의사항
          </h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.92rem] leading-[1.5] text-[#1d4ed8]">
            {noticeItems.map((notice) => (
              <li key={notice}>{notice}</li>
            ))}
          </ul>
        </section>
      </Card>
    </div>
  );
}
