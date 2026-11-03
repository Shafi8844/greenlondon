'use client'
import { Check, Leaf } from "lucide-react"
import Background from "../../../../public/authBack.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"


const SignUpPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false)
    const [authError, setAuthError] = useState<string | null>(null)

    const handleEmailSignUp=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setAuthError(null)
        setIsSubmitting(true)
        const formData = new FormData(e.currentTarget)
        const user =Object.fromEntries(formData.entries()) as {name:string, email:string,password:string}

        console.log(user)

        const{data,error} =await authClient.signUp.email({
            ...user,
        })
        if(data){
            console.log(data)
            redirect('/')
        }
        if(error){
            console.log(error)
        }
        
    }
    const handleGoogleSignUp=async()=>{
      setAuthError(null)
      setIsGoogleSubmitting(true)
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })
      if (error) {
        setAuthError(error.message ?? "Unable to sign up with Google. Please try again.")
        setIsGoogleSubmitting(false)
      }
    }
  return (
    <main className="signup-screen grid min-h-dvh grid-cols-1 bg-[#f7faf7] lg:grid-cols-[1.02fr_0.98fr]">
      <section
        aria-label="GreenLondon community"
        className="relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-cover bg-center px-7 py-7 text-white sm:px-10 sm:py-9 lg:min-h-dvh lg:px-14 lg:py-12"
        style={{ backgroundImage: `url("${Background.src}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#09251c]/45 via-[#09251c]/10 to-[#09251c]/80" />
        <Link href="/" className="relative z-10 flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-white">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur"><Leaf className="size-4" /></span>
          GreenLondon
        </Link>
        <div className="relative z-10 max-w-lg pt-14 lg:pt-0">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#b8edc8]">Grow something good</p>
          <h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-[56px]">
            A greener city <span className="text-[#8bd5a6]">starts with us.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base">Meet your neighbours, join local projects, and make a visible difference where you live.</p>
          <ul className="mt-6 grid gap-3 text-sm font-medium sm:grid-cols-2">
            {[
              "Find local events",
              "Track volunteer hours",
              "Start an initiative",
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-white/90">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#39b979] text-[#10291c]">
                  <Check aria-hidden="true" className="size-3 stroke-[3]" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <Link href="/" className="flex w-fit items-center gap-2 text-sm font-bold text-[#1d3027] lg:hidden"><Leaf className="size-4 text-[#31a96d]" />GreenLondon</Link>
          </div>
          <div className="mb-7">
            <span className="inline-flex rounded-full bg-[#e7f5eb] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#237548]">Join the community</span>
            <h2 className="mt-4 text-3xl leading-tight font-bold tracking-[-0.04em] text-[#17271f] sm:text-[38px]">
              Your next good thing starts here.
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6b7b72]">
              Create an account to join local events and build greener neighbourhoods.
            </p>
          </div>

          <div className="mb-5 flex items-center gap-4 text-xs font-medium text-[#89958e]">
            <span className="h-px flex-1 bg-[#e2eae4]" />
            Sign up with email
            <span className="h-px flex-1 bg-[#e2eae4]" />
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="full-name" className="text-sm font-semibold text-[#1d3027]">
                Full name
              </Label>
              <Input
                id="full-name"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
                className="h-12 rounded-xl border-[#d5e2d8] bg-white px-4 text-sm shadow-sm shadow-[#153d2410] placeholder:text-[#929992] focus-visible:border-[#39b979] focus-visible:ring-[#39b979]/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-[#1d3027]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-12 rounded-xl border-[#d5e2d8] bg-white px-4 text-sm shadow-sm shadow-[#153d2410] placeholder:text-[#929992] focus-visible:border-[#39b979] focus-visible:ring-[#39b979]/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-[#1d3027]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
                className="h-12 rounded-xl border-[#d5e2d8] bg-white px-4 text-sm shadow-sm shadow-[#153d2410] placeholder:text-[#929992] focus-visible:border-[#39b979] focus-visible:ring-[#39b979]/20"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-xl bg-[#16834e] text-sm font-semibold text-white shadow-sm shadow-[#16834e]/20 hover:bg-[#126d41]"
            >
              {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
            <Button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isGoogleSubmitting}
              className="mt-2 h-12 w-full rounded-xl bg-[#16834e] text-sm font-semibold text-white shadow-sm shadow-[#16834e]/20 hover:bg-[#126d41]"
            >
              {isGoogleSubmitting ? "Connecting to Google…" : "Continue with Google"}
            </Button>
            {authError && <p role="alert" className="text-sm text-red-600">{authError}</p>}
          </form>
        </div>
      </section>
    </main>
  )
}

export default SignUpPage
