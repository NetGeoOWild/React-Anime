import { updatePassword } from "@/api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Button } from "@/components/common/Button";
import { useForm } from "react-hook-form";
import { resetPassSchema, type ResetPassData } from "@/utils/validation/reset";
import { zodResolver } from "@hookform/resolvers/zod";

export function ResetForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassData>({
    resolver: zodResolver(resetPassSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: ResetPassData) {
    try {
      await updatePassword(data.password);
      toast.success("Your password has been successfully updated!");
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        reset();
      }
    }
  }

  return (
    <div className="mx-auto w-full max-w-168.75">
      <h4 className="mb-2.5 text-center text-3xl">Create new password</h4>
      <form
        className="dark:border-my-accent/50 border-light-theme/50 mb-5 flex flex-col rounded-lg border-2 p-3.75"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="password" className="mb-1.25 text-lg">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Enter new password"
          className="dark:focus:ring-my-accent focus:ring-light-theme relative mb-5 rounded-[5px] bg-mist-600 py-3.25 pr-5.75 pl-9.5 text-white placeholder:text-white focus:ring-2 focus:outline focus:outline-none max-xl:py-2.25 max-xl:text-sm dark:bg-[#302D2D] dark:placeholder:text-[#E5E5E5]"
        />
        {errors.password && (
          <div className="mb-2.5 font-bold text-red-500">
            {errors.password.message}
          </div>
        )}
        <div>
          <Button
            text={isSubmitting ? "Сhanging..." : "Change Password"}
            fill={true}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
