import React from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import Confetti from 'react-confetti';

type ConfProps = {
  show: boolean;
};
export default function ConfettiComponent({ show }: ConfProps) {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      // style={{ pointerEvents: 'none' }}
      numberOfPieces={show ? 750 : 0}
      onConfettiComplete={(confettiInstance: any) => {
        confettiInstance.reset();
      }}
    />
  );
}
