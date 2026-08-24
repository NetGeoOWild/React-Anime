import { useState } from "react";
import { Button } from "../common/Button";
import { resetPassword } from "@/api/authApi";
import { toast } from "react-toastify";
import { Link } from "react-router";

export function ForgetForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function cleanHandler() {
    setEmail("");
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      await resetPassword(email);
      toast.success("Mail successful sended on your adress!");
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
      <h4 className="mb-2.5 text-center text-3xl">Reset Password</h4>
      <form
        className="border-my-accent/50 mb-5 flex flex-col rounded-lg border-2 p-3.75"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="mb-1.25 text-lg">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Enter email"
          className="placeholder:text-[#E5E5E5]focus:outline focus:ring-my-accent relative mb-5 rounded-[5px] bg-[#302D2D] py-3.25 pr-5.75 pl-9.5 text-white focus:ring-2 focus:outline-none max-xl:py-2.25 max-xl:text-sm"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <Button
            text={loading ? "Sending..." : "Reset"}
            fill={true}
            disabled={loading}
          />
        </div>
      </form>
      <Link to="/login">
        <Button text="Log in" fill={false} />
      </Link>
    </div>
  );
}
