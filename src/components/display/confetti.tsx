"use client";

import React from "react";
import useWindowSize from "~/components/hooks/use-window";
import Confetti from "react-confetti";

type ConfProps = {
  show: boolean;
};
export function ConfettiComponent({ show }: ConfProps) {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={show ? 750 : 0}
      onConfettiComplete={(confettiInstance: any) => {
        confettiInstance.reset();
      }}
    />
  );
}
