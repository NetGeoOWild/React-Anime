import { Button } from "../common/Button";
import { useAuthStore } from "@/store/authStore";
import { signIn } from "@/api/authApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { loginSchema, type LogInFormData } from "@/utils/validation/login";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LogInFormData) {
    try {
      const result = await signIn(data.email, data.password);
      toast.success("Sign-in successful!");
      authStore.setAuth(result.user, result.session);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        reset();
      }
    }
  }

  return (
    <div className="mx-auto w-full max-w-168.75">
      <h4 className="mb-2.5 text-center text-3xl">Login</h4>
      <form
        className="dark:border-my-accent/50 border-light-theme/50 mb-5 flex flex-col rounded-lg border-2 p-3.75"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="mb-1.25 text-lg">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter email"
          className="dark:focus:ring-my-accent focus:ring-light-theme relative mb-5 rounded-[5px] bg-mist-600 py-3.25 pr-5.75 pl-9.5 text-white placeholder:text-white focus:ring-2 focus:outline focus:outline-none max-xl:py-2.25 max-xl:text-sm dark:bg-[#302D2D] dark:placeholder:text-[#E5E5E5]"
        />
        {errors.email && (
          <div className="mb-2.5 font-bold text-red-500">
            {errors.email.message}
          </div>
        )}
        <label htmlFor="password" className="mb-1.25 text-lg">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Enter password"
          className="dark:focus:ring-my-accent focus:ring-light-theme relative mb-5 rounded-[5px] bg-mist-600 py-3.25 pr-5.75 pl-9.5 text-white placeholder:text-white focus:ring-2 focus:outline focus:outline-none max-xl:py-2.25 max-xl:text-sm dark:bg-[#302D2D] dark:placeholder:text-[#E5E5E5]"
        />
        {errors.password && (
          <div className="mb-2.5 font-bold text-red-500">
            {errors.password.message}
          </div>
        )}
        <div>
          <Button
            text={isSubmitting ? "Logging in..." : "Sign in"}
            fill={true}
            disabled={isSubmitting}
          />
        </div>
      </form>
      <Link to="/forget">
        <Button text="Forget password" fill={false} />
      </Link>
    </div>
  );
}
