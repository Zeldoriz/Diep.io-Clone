import type React from 'react';
import Mouse from '../../assets/mouse.jpg';
import useLoadTexture from '../../hooks/loadTexture';
import { useEffect, useState, type RefObject } from 'react';
import useEnemyRotation from './useEnemyRotation';
import useEnemyPosition from './useEnemyPosition';
import type PlayerProjType from '../../types/PlayerProjType';

interface EnemyProps {
  enemyProps: {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
  };
  playerPosition: {
    x: number;
    y: number;
  };
  playerProj: RefObject<PlayerProjType[]>;
}

const Enemy: React.FC<EnemyProps> = ({ enemyProps, playerPosition, playerProj }) => {
  const texture = useLoadTexture(Mouse);
  const enemySize = 75;
  const [health, setHealth] = useState(100);

  // Position Update
  const [position, setPosition] = useState({ x: enemyProps.x, y: enemyProps.y });
  useEnemyPosition(position, setPosition, playerPosition);

  // Rotation Update
  const [rotation, setRotation] = useState(0);
  useEnemyRotation(setRotation, playerPosition, position);

  // Collision with Player Projectile
  useEffect(() => {
    const checkCollision = () => {
      playerProj.current.forEach((proj) => {
        const dx = position.x - proj.x;
        const dy = position.y - proj.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < enemySize / 2) {
          // Collision detected
          console.log('Collision detected!', proj.id);
          // Handle collision (e.g., reduce health, remove projectile, etc.)
          playerProj.current = playerProj.current.filter((p) => p.id !== proj.id);
        }
      });
      frame = requestAnimationFrame(checkCollision);
    };
    let frame: number;
    frame = requestAnimationFrame(checkCollision);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [position.x, position.y, playerProj]);

  return (
    <pixiSprite
      key={enemyProps.id}
      texture={texture}
      angle={rotation + 90}
      anchor={0.5}
      width={enemySize}
      height={enemySize}
      x={position.x}
      y={position.y}
    />
  );
};

export default Enemy;
