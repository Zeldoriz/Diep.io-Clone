import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';

const usePlayerPosition = (
  setPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  screenWidth: number,
  screenHeight: number
) => {
  const keys = useRef<{ [key: string]: boolean }>({});
  const velocity = useRef({ x: 0, y: 0 });
  const friction = 0.97;
  const playerAccel = 0.3;

  // Position Update
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const handlePositionUpdate = () => {
      if (keys.current['ArrowUp'] || keys.current['w'] || keys.current['W']) {
        velocity.current.y -= playerAccel;
      }
      if (keys.current['ArrowDown'] || keys.current['s'] || keys.current['S']) {
        velocity.current.y += playerAccel;
      }
      if (keys.current['ArrowLeft'] || keys.current['a'] || keys.current['A']) {
        velocity.current.x -= playerAccel;
      }
      if (keys.current['ArrowRight'] || keys.current['d'] || keys.current['D']) {
        velocity.current.x += playerAccel;
      }

      // console.log('FPS Pos Checker: ', { x: velocity.current.x, y: velocity.current.y });

      // Limit friction calculation to a threshold to prevent performance issues
      if (
        velocity.current.x > 0.01 ||
        velocity.current.x < -0.01 ||
        velocity.current.y > 0.01 ||
        velocity.current.y < -0.01
      ) {
        velocity.current.x *= friction;
        velocity.current.y *= friction;
      } else {
        velocity.current.x = 0;
        velocity.current.y = 0;
      }

      // Boundary check and position change with velocity
      setPosition((prev) => ({
        x: Math.max(0, Math.min(screenWidth, prev.x + velocity.current.x)),
        y: Math.max(0, Math.min(screenHeight, prev.y + velocity.current.y))
      }));

      frame = requestAnimationFrame(handlePositionUpdate);
    };

    let frame: number;
    frame = requestAnimationFrame(handlePositionUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [screenHeight, screenWidth, setPosition]);
};

export default usePlayerPosition;
