import { JSX, PropsWithoutRef } from "react";

type Props = PropsWithoutRef<JSX.IntrinsicElements["button"]>

export default function Button({ ...props }: Props) {
  return (
    <button {...props} />
  );
}
