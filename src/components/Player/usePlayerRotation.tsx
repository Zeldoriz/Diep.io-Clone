import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';

const usePlayerRotation = (
  setRotation: Dispatch<SetStateAction<number>>,
  position: {
    x: number;
    y: number;
  }
) => {
  const mouseOver = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;
    const handleMouseMove = (e: MouseEvent) => {
      mouseOver.current.x = e.clientX;
      mouseOver.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateRotation = () => {
      const radians = Math.atan2(mouseOver.current.y - position.y, mouseOver.current.x - position.x);
      const degrees = radians * (180 / Math.PI);
      setRotation(degrees);
      frame = requestAnimationFrame(updateRotation);
    };
    frame = requestAnimationFrame(updateRotation);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
};

export default usePlayerRotation;
