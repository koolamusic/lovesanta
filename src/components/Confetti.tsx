import React from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import Confetti from 'react-confetti';

export default function ConfettiComponent() {
  const { width, height } = useWindowSize();
  const [party, setParty] = React.useState(false);

  return (
    <Confetti
      width={width}
      height={height}
      recycle={party}
      // style={{ pointerEvents: 'none' }}
      numberOfPieces={800}
      onConfettiComplete={(confettiInstance: any) => {
        setParty(false);
        confettiInstance.reset();
      }}
    />
  );
}
