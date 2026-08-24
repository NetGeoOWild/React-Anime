import { useState } from "react";
import { updatePassword } from "@/api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Button } from "@/components/common/Button";

export function ResetForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function cleanHandler() {
    setPassword("");
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      await updatePassword(password);
      toast.success("Your password has been successfully updated!");
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }

    cleanHandler();
  }

  return (
    <div className="mx-auto w-full max-w-168.75">
      <h4 className="mb-2.5 text-center text-3xl">Create new password</h4>
      <form
        className="border-my-accent/50 mb-5 flex flex-col rounded-lg border-2 p-3.75"
        onSubmit={handleSubmit}
      >
        <label htmlFor="password" className="mb-1.25 text-lg">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Enter new password"
          className="placeholder:text-[#E5E5E5]focus:outline focus:ring-my-accent relative mb-5 rounded-[5px] bg-[#302D2D] py-3.25 pr-5.75 pl-9.5 text-white focus:ring-2 focus:outline-none max-xl:py-2.25 max-xl:text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button
            text={loading ? "Сhanging..." : "Change Password"}
            fill={true}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
