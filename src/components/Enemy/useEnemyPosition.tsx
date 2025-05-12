import { useEffect } from 'react';

const useEnemyPosition = (
  position: {
    x: number;
    y: number;
  },
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  playerPosition: {
    x: number;
    y: number;
  }
) => {
  useEffect(() => {
    const speed = 3; // Adjust the speed of the enemy
    const angle = Math.atan2(playerPosition.y - position.y, playerPosition.x - position.x);
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    const handlePositionUpdate = () => {
      setPosition((prevPosition) => ({
        x: prevPosition.x + vx,
        y: prevPosition.y + vy
      }));

      frame = requestAnimationFrame(handlePositionUpdate);
    };

    let frame = requestAnimationFrame(handlePositionUpdate);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [playerPosition.x, playerPosition.y, setPosition, position.x, position.y]);
};
export default useEnemyPosition;
