import { useEffect } from 'react';

const useEnemyRotation = (
  setRotation: React.Dispatch<React.SetStateAction<number>>,
  playerPosition: {
    x: number;
    y: number;
  },
  position: {
    x: number;
    y: number;
  }
) => {
  useEffect(() => {
    const radians = Math.atan2(playerPosition.y - position.y, playerPosition.x - position.x);
    const degrees = radians * (180 / Math.PI);

    const updateRotation = () => {
      setRotation(degrees);
      frame = requestAnimationFrame(updateRotation);
    };

    let frame = requestAnimationFrame(updateRotation);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [position.x, position.y, playerPosition.x, playerPosition.y, setRotation]);
};

export default useEnemyRotation;
