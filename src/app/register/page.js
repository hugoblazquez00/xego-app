import RegisterForm from "@/components/home/register-form";
import { Ripple } from "@/components/magicui/ripple";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative w-full overflow-hidden">
      <RegisterForm />
      <Ripple className="border-[#275eff]" />
    </div>
  );
}
