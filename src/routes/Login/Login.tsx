import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CircleAlert, GraduationCap, House, ShieldCheck } from "lucide-react";
import { AuthSegmentedControl } from "@/components/auth/AuthSegmentedControl";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const festivalHomeUrl = (import.meta.env.VITE_FESTIVAL_HOME_URL as string | undefined)?.trim() ?? "";
  const hasFestivalHomeUrl = Boolean(festivalHomeUrl);
  const canSubmit = studentId.trim().length > 0 && password.trim().length > 0;
  const inputClassName =
    "h-11 rounded-2xl border-[#9fc3f5] bg-white px-4 placeholder:text-[#9aa4b2] transition-all duration-200 focus-visible:border-[#2563eb] focus-visible:ring-[#2563eb]/20";

  const redirect = searchParams.get("redirect");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login({ studentId, password }, "student");
      navigate(redirect || "/ticketing");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e4f0ff]">
      <div className="mx-auto w-full max-w-[420px] px-5 py-6">
        <button
          type="button"
          onClick={() => {
            if (hasFestivalHomeUrl) {
              window.location.href = festivalHomeUrl;
            }
          }}
          disabled={!hasFestivalHomeUrl}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-55"
        >
          <House className="h-4 w-4" strokeWidth={2.3} />
          축제 홈으로
        </button>

        <div className="mt-9">
          <h1 className="text-[2.1rem] leading-[1.12] font-black tracking-tight text-[#111827]">
            티켓팅 시작하기
          </h1>
        </div>

        <section className="mt-6 rounded-2xl border border-[#9fc3f5] bg-[#cfe0f6]/75 px-3.5 py-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white">
              <ShieldCheck className="h-4 w-4" strokeWidth={2.3} />
            </div>
            <div className="pt-0.5">
              <span className="inline-flex items-center rounded-full bg-[#2563eb] px-2 py-0.5 text-[11px] font-semibold text-white">
                재학생 전용
              </span>
              <p className="mt-1 text-sm font-semibold text-[#1e3a8a]">
                단국존 티켓팅 및 이용은 단국대학교 재학생만 가능합니다
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6">
          <AuthSegmentedControl activeTab="login" />
        </div>

        <main className="pt-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <section className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-sm font-semibold text-[#111827]">
                  학번
                </Label>
                <Input
                  id="studentId"
                  value={studentId}
                  onChange={(event) => setStudentId(event.target.value)}
                  placeholder="학번 8자리를 입력해 주세요"
                  className={inputClassName}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-[#111827]">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="비밀번호를 입력해 주세요"
                  className={inputClassName}
                  required
                />
              </div>

              <p className="flex items-start gap-1.5 text-[11px] font-medium leading-5 text-[#4b5563]">
                <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2.3} />
                가입한 티켓팅 계정 비밀번호를 입력해 주세요.
              </p>
            </section>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="h-11 w-full rounded-2xl bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white shadow-[0_16px_24px_-18px_rgba(37,99,235,0.75)] transition-all duration-200 hover:translate-y-[-1px] hover:from-[#3478ef] hover:to-[#1f59db] disabled:translate-y-0 disabled:opacity-55"
              disabled={submitting || !canSubmit}
            >
              <GraduationCap className="h-4 w-4" strokeWidth={2.3} />
              {submitting ? "로그인 중..." : "티켓팅 계정으로 로그인"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#4b5563]">티켓팅 서비스를 처음 이용하시나요?</p>
            <Link
              to="/signup"
              state={{ authTabFrom: "login" }}
              className="mt-2 inline-block text-sm font-semibold text-[#2563eb]"
            >
              회원가입하러 가기
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
