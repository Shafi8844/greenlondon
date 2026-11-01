import { Check } from "lucide-react"
import Background from "../../../../public/authBack.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignUpPage = () => {
  return (
    <main className="signup-screen grid min-h-dvh grid-cols-1 bg-white md:grid-cols-2">
      <section
        aria-label="GreenLondon community"
        className="relative flex min-h-[420px] flex-col justify-end bg-cover bg-center px-8 py-7 text-white md:min-h-dvh"
        style={{ backgroundImage: `url("${Background.src}")` }}
      >
        <div className="max-w-lg">
          <h1 className="text-4xl leading-[1.15] font-bold tracking-tight sm:text-[42px]">
            A greener city <span className="text-[#8bd5a6]">starts with us.</span>
          </h1>
          <ul className="mt-4 space-y-1.5 text-sm font-medium">
            {[
              "Join events in two taps",
              "Track your volunteer hours",
              "Create your own initiative",
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#39b979]">
                  <Check aria-hidden="true" className="size-3 stroke-[3]" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-8 lg:px-11">
        <div className="w-full max-w-[448px]">
          <div className="mb-6 flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-[34px] rounded-full border-[#d9e9de] px-4 text-xs font-medium text-[#1d3027]"
            >
              Login
            </Button>
            <Button
              type="button"
              className="h-[34px] rounded-full bg-[#39b979] px-4 text-xs font-medium text-[#10291c] hover:bg-[#31a96d]"
            >
              Join the Community
            </Button>
          </div>

          <h2 className="text-[34px] leading-tight font-bold tracking-[-0.04em] text-[#17271f] sm:text-[36px]">
            Join your neighbours.
          </h2>
          <p className="mt-1 text-[13px] text-[#6b7b72]">
            Create a free account to join and create initiatives.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-7 h-[42px] w-full rounded-full border-[#d9e9de] bg-white text-xs font-semibold text-[#1d3027] hover:bg-[#f8fbf9]"
          >
            <span aria-hidden="true" className="mr-1 text-sm font-bold">
              G
            </span>
            Continue with Google
          </Button>

          <div className="mt-4 space-y-[14px]">
            <div className="space-y-1.5">
              <Label htmlFor="full-name" className="text-xs font-semibold text-[#1d3027]">
                Full name
              </Label>
              <Input
                id="full-name"
                placeholder="Your name"
                className="h-[42px] rounded-xl border-[#d9e9de] px-3 text-xs shadow-none placeholder:text-[#929992]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-[#1d3027]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-[42px] rounded-xl border-[#d9e9de] px-3 text-xs shadow-none placeholder:text-[#929992]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="borough" className="text-xs font-semibold text-[#1d3027]">
                Home borough
              </Label>
              <div className="relative">
                <Input
                  id="borough"
                  value="Hackney"
                  readOnly
                  className="h-[42px] rounded-xl border-[#d9e9de] px-3 pr-9 text-xs text-[#26362d] shadow-none"
                />
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="pointer-events-none absolute top-1/2 right-3 size-3 -translate-y-1/2 fill-none stroke-[#25352d] stroke-1.5"
                >
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-[#1d3027]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                className="h-[42px] rounded-xl border-[#d9e9de] px-3 text-xs shadow-none placeholder:text-[#929992]"
              />
            </div>
          </div>

          <Button
            type="button"
            className="mt-5 h-[40px] w-full rounded-full bg-[#39b979] text-xs font-semibold text-[#10291c] hover:bg-[#31a96d]"
          >
            Create account
          </Button>
        </div>
      </section>
    </main>
  )
}

export default SignUpPage
