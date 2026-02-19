import { ArrowRight, CreditCard, ClipboardList, Ticket } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/common/ui/accordion";
import { Card } from "@/components/common/ui/card";

interface TicketingHomePanelProps {
  onOpenTicketingList: () => void;
  onOpenMyTickets: () => void;
}

const guideItems = [
  {
    step: 1,
    title: "티켓 오픈 시간 확인",
    description:
      "티켓 목록에서 각 공연의 오픈 시간을 확인하세요. 오픈 10분 전부터 카운트다운이 시작됩니다.",
  },
  {
    step: 2,
    title: "대기 및 예매",
    description: "티켓팅 시작 시각이 되면 예매 버튼이 활성화됩니다.",
  },
  {
    step: 3,
    title: "내 티켓 확인",
    description: "예매에 성공하면 내 티켓에서 예매한 티켓을 확인할 수 있습니다.",
  },
  {
    step: 4,
    title: "현장 팔찌 수령",
    description:
      "공연 당일 지정된 장소에서 스태프에게 티켓을 제시하세요. 스태프가 티켓 확인 및 팔찌 배부 처리를 하면, 내 티켓 상태가 업데이트됩니다.",
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
  "예매한 티켓은 취소가 불가능합니다",
  "팔찌 미수령 시 단국존 입장이 불가하오니, 수령 시간에 맞추어 입장 팔찌를 수령해가시길 바랍니다.",
];

const toSummary = (description: string): string => {
  const [firstSentence] = description.split(".");
  if (!firstSentence) {
    return description;
  }
  return `${firstSentence.trim()}.`;
};

export function TicketingHomePanel({
  onOpenTicketingList,
  onOpenMyTickets,
}: TicketingHomePanelProps) {
  return (
    <div className="mx-auto w-full max-w-md space-y-4 pb-4">
      <button type="button" onClick={onOpenTicketingList} className="block w-full text-left">
        <Card className="min-h-[122px] rounded-[24px] border border-[#bfd5f6] bg-gradient-to-r from-[#3b82f6] to-[#2563eb] p-4 shadow-[0_10px_20px_-16px_rgba(37,99,235,0.35)]">
          <div className="grid min-h-[90px] grid-cols-[52px_1fr_24px] items-center gap-3.5">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] border border-white/30 bg-white/14 text-white">
              <Ticket className="h-[22px] w-[22px]" strokeWidth={2.1} />
            </div>
            <div className="flex min-h-[56px] flex-col justify-center">
              <h2 className="text-[1.28rem] leading-[1.2] font-bold text-white">공연 티켓팅 하러가기</h2>
              <p className="mt-1 text-[0.96rem] leading-[1.35] font-medium text-white/90">
                새로운 공연 티켓을 예매하세요
              </p>
            </div>
            <ArrowRight className="h-6 w-6 shrink-0 text-white" strokeWidth={2.3} />
          </div>
        </Card>
      </button>

      <button type="button" onClick={onOpenMyTickets} className="block w-full text-left">
        <Card className="min-h-[122px] rounded-[24px] border border-[#bfd5f6] bg-[#f8fbff] p-4 shadow-[0_10px_20px_-16px_rgba(37,99,235,0.35)]">
          <div className="grid min-h-[90px] grid-cols-[52px_1fr_24px] items-center gap-3.5">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-[#dbe9fb] text-[#2563eb]">
              <CreditCard className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </div>
            <div className="flex min-h-[56px] flex-col justify-center">
              <h2 className="text-[1.28rem] leading-[1.2] font-bold text-[#111827]">내 티켓 확인하기</h2>
              <p className="mt-1 text-[0.96rem] leading-[1.35] font-medium text-[#4b5563]">
                예매한 티켓을 확인하세요
              </p>
            </div>
            <ArrowRight className="h-6 w-6 shrink-0 text-[#1f2937]" strokeWidth={2.3} />
          </div>
        </Card>
      </button>

      <Card className="rounded-[24px] border border-[#bfd5f6] bg-white p-4 shadow-[0_10px_20px_-16px_rgba(37,99,235,0.35)]">
        <h3 className="flex items-center gap-2 text-[1.08rem] font-bold text-[#111827]">
          <ClipboardList className="h-4 w-4 text-[#64748b]" strokeWidth={2.1} />
          티켓팅 이용 가이드 (꼭 읽어주세요 !)
        </h3>
        <Accordion
          type="single"
          collapsible
          defaultValue="guide-1"
          className="mt-3 rounded-2xl border border-[#e4ecfb] bg-[#fbfdff] px-3"
        >
          {guideItems.map((item) => (
            <AccordionItem key={item.step} value={`guide-${item.step}`} className="border-[#e7eefa]">
              <AccordionTrigger className="py-3 text-left font-normal hover:no-underline">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3b82f6] text-xs font-bold text-white">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-[0.94rem] font-bold leading-snug text-[#111827]">{item.title}</p>
                    <p className="mt-0.5 text-[0.8rem] leading-[1.45] text-[#64748b]">
                      {toSummary(item.description)}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-9 pt-0 pb-3">
                <p className="text-[0.82rem] leading-[1.55] text-[#4b5563]">{item.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <Card className="rounded-[24px] border border-[#bfd5f6] bg-[#eaf2ff] p-4 shadow-[0_10px_20px_-16px_rgba(37,99,235,0.35)]">
        <h4 className="text-[1rem] font-bold text-[#1e3a8a]">💡 유의사항</h4>
        <ul className="mt-2.5 space-y-2 text-[0.86rem] leading-[1.55] text-[#1d4ed8]">
          {noticeItems.map((notice) => (
            <li key={notice}>• {notice}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
