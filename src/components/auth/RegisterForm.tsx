import { useState } from "react";
import { Button } from "../common/Button";
import { signUp } from "@/api/authApi";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const authStore = useAuthStore();
  const navigate = useNavigate();

  function cleanHandler() {
    setEmail("");
    setPassword("");
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await signUp(email, password);
      toast.success("Registration successful!");
      authStore.setAuth(data.user, data.session);
      navigate("/");
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
      <h4 className="mb-2.5 text-center text-3xl">Register</h4>
      <form
        className="border-my-accent/50 flex flex-col rounded-lg border-2 p-3.75"
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
          className="placeholder:text-[#E5E5E5]focus:outline focus:ring-my-accent relative mb-2.5 rounded-[5px] bg-[#302D2D] py-3.25 pr-5.75 pl-9.5 text-white focus:ring-2 focus:outline-none max-xl:py-2.25 max-xl:text-sm"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="mb-1.25 text-lg">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Enter password"
          className="placeholder:text-[#E5E5E5]focus:outline focus:ring-my-accent relative mb-5 rounded-[5px] bg-[#302D2D] py-3.25 pr-5.75 pl-9.5 text-white focus:ring-2 focus:outline-none max-xl:py-2.25 max-xl:text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text={loading ? "Creating..." : "Sign up"}
          fill={true}
          disabled={loading}
        />
      </form>
    </div>
  );
}
