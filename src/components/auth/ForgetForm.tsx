import { Button } from "../common/Button";
import { resetPassword } from "@/api/authApi";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import {
  forgetPasswordSchema,
  type ForgetPassData,
} from "@/utils/validation/forget";
import { zodResolver } from "@hookform/resolvers/zod";

export function ForgetForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPassData>({ resolver: zodResolver(forgetPasswordSchema) });

  async function onSubmit(data: ForgetPassData) {
    try {
      await resetPassword(data.email);
      toast.success("Mail successful sended on your adress!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      reset();
    }
  }

  return (
    <div className="mx-auto w-full max-w-168.75">
      <h4 className="mb-2.5 text-center text-3xl">Reset Password</h4>
      <form
        className="dark:border-my-accent/50 border-light-theme/50 mb-5 flex flex-col rounded-lg border-2 p-3.75"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="email"
          className="mb-1.25 text-lg text-black dark:text-white"
        >
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
        <div>
          <Button
            text={isSubmitting ? "Sending..." : "Reset"}
            fill={true}
            disabled={isSubmitting}
          />
        </div>
      </form>
      <Link to="/login">
        <Button text="Log in" fill={false} />
      </Link>
    </div>
  );
}
