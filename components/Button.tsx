import { ReactNode } from "react";
import classNames from "classnames";

type Variant =
  | "primary"
  | "secondary"
  | "primary-outline"
  | "secondary-outline";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  variant: Variant;
};

const variants: Record<Variant, string> = {
  primary: "bg-purple-500 hover:bg-purple-700 text-white border border-purple-500",
  secondary: "bg-pink-500 hover:bg-pink-700 text-white border border-pink-500",
  "primary-outline": "bg-white hover:bg-purple-200 text-purple-500 border border-purple-500",
  "secondary-outline": "bg-white hover:bg-pink-200 text-pink-500 border border-pink-500",
};

export default function Button({ className, variant, ...props }: Props) {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "px-4 py-2 font-semibold rounded-full shadow flex justify-center items-center",
        variants[variant]
      )}
    />
  );
}
