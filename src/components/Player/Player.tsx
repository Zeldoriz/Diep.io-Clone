import Cat from '../../assets/cat.jpg';
import useLoadTexture from '../../hooks/loadTexture';
import { useEffect, useRef, useState } from 'react';

const Player = () => {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  const texture = useLoadTexture(Cat);

  const [position, setPosition] = useState({
    x: document.documentElement.clientWidth / 2,
    y: document.documentElement.clientHeight / 2
  });
  const [rotation, setRotation] = useState(0);
  const mouseOver = useRef({ x: 0, y: 0 });

  // Rotation Update
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
  }, [position]);

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
      if (keys.current['ArrowUp'] || keys.current['w']) {
        velocity.current.y -= playerAccel;
      }
      if (keys.current['ArrowDown'] || keys.current['s']) {
        velocity.current.y += playerAccel;
      }
      if (keys.current['ArrowLeft'] || keys.current['a']) {
        velocity.current.x -= playerAccel;
      }
      if (keys.current['ArrowRight'] || keys.current['d']) {
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

      // Update position with velocity
      setPosition((prev) => ({
        x: prev.x + velocity.current.x,
        y: prev.y + velocity.current.y
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
  }, []);

  // Projectile Update
  const projectilesRef = useRef<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);
  const [, forceUpdate] = useState(0);
  const projSpeed = 0.35;

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const angle = Math.atan2(e.clientY - position.y, e.clientX - position.x);
      const vx = Math.cos(angle) * projSpeed;
      const vy = Math.sin(angle) * projSpeed;

      projectilesRef.current.push({ id: Date.now(), x: position.x, y: position.y, vx, vy });
      forceUpdate((prev) => prev + 1);
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [position]);

  useEffect(() => {
    const updateProjectiles = () => {
      projectilesRef.current = projectilesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy
        }))
        .filter((p) => p.x > 0 && p.x < screenWidth && p.y > 0 && p.y < screenHeight); // Remove out-of-bounds projectiles

      requestAnimationFrame(updateProjectiles);
    };
    const frame = requestAnimationFrame(updateProjectiles);
    return () => cancelAnimationFrame(frame);
  }, [screenHeight, screenWidth]);

  return (
    <pixiContainer>
      {projectilesRef.current.map((proj) => (
        <pixiSprite key={proj.id} texture={texture} x={proj.x} y={proj.y} width={20} height={20} anchor={0.5} />
      ))}
      <pixiSprite
        texture={texture}
        width={100}
        height={100}
        angle={rotation + 90}
        anchor={0.5}
        x={position.x}
        y={position.y}
      />
    </pixiContainer>
  );
};

export default Player;
