import { memo } from "react";

type Props = {
  fill: boolean;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = memo(function Button({
  fill,
  text,
  disabled = false,
  onClick,
}: Props) {
  console.log(fill);
  return (
    <button
      className={`${fill ? "border-my-accent bg-my-accent hover:bg-my-accent/50 hover:border-my-accent/50 border-2 border-solid" : "border-my-accent hover:border-my-accent/50 border-2 border-solid"} disabled:border-my-accent/50 w-full cursor-pointer rounded-[5px] px-7 py-2.25 text-lg text-white duration-300 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-white/50 max-xl:py-0.75`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
});
