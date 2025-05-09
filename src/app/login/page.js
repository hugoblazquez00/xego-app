import LoginForm from "@/components/home/login-form";
import { Ripple } from "@/components/magicui/ripple";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative  w-full overflow-hidden">
      
      <LoginForm />
      <Ripple className="border-[#275eff] "/>
    </div>
  );
}
