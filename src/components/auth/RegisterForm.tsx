import { Button } from "../common/Button";
import { signUp } from "@/api/authApi";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type RegisterFormData,
  registerSchema,
} from "@/utils/validation/register";

export function RegisterForm() {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      const result = await signUp(data.email, data.password);
      toast.success("Registration successful!");
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
      <h4 className="mb-2.5 text-center text-3xl">Registration</h4>
      <form
        className="border-my-accent/50 flex flex-col rounded-lg border-2 p-3.75"
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
          className="placeholder:text-[#E5E5E5]focus:outline focus:ring-my-accent relative mb-2.5 rounded-[5px] bg-[#302D2D] py-3.25 pr-5.75 pl-9.5 text-white focus:ring-2 focus:outline-none max-xl:py-2.25 max-xl:text-sm"
        />
        {errors.email && (
          <div className="mb-2.5 text-red-500">{errors.email.message}</div>
        )}
        <label htmlFor="password" className="mb-1.25 text-lg">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Enter password"
          className="placeholder:text-[#E5E5E5]focus:outline focus:ring-my-accent relative mb-5 rounded-[5px] bg-[#302D2D] py-3.25 pr-5.75 pl-9.5 text-white focus:ring-2 focus:outline-none max-xl:py-2.25 max-xl:text-sm"
        />
        {errors.password && (
          <div className="mb-2.5 text-red-500">{errors.password.message}</div>
        )}
        <Button
          text={isSubmitting ? "Creating..." : "Sign up"}
          fill={true}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
