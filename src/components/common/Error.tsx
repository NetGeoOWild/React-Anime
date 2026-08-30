type Props = {
  message: string;
};
export function Error({ message }: Props) {
  return (
    <div className="flex justify-center py-10">
      <div className="dark:bg-my-accent bg-light-theme rounded-[5px] p-4 text-center text-lg xl:text-2xl">
        {message}
      </div>
    </div>
  );
}
