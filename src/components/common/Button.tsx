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
  return (
    <button
      className={`${fill ? "dark:border-my-accent dark:bg-my-accent dark:hover:bg-my-accent/50 dark:hover:border-my-accent/50 border-light-theme bg-light-theme hover:border-light-theme/50 hover:bg-light-theme/50 border-2 border-solid" : "dark:border-my-accent dark:hover:border-my-accent/50 border-light-theme hover:border-light-theme/50 border-2 border-solid"} dark:disabled:border-my-accent/50 w-full cursor-pointer rounded-[5px] px-7 py-2.25 text-lg text-black duration-300 disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-black/30 disabled:text-white max-xl:py-0.75 dark:text-white dark:disabled:bg-white/30 dark:disabled:text-white/50`}

      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
});
