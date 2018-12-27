import React from "react";

interface IButtonProps {
  children: React.ReactNode;
}

export function Button(props: IButtonProps) {
  return <Button>{props.children}</Button>;
}
