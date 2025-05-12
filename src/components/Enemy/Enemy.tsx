import type React from 'react';
import Mouse from '../../assets/mouse.jpg';
import useLoadTexture from '../../hooks/loadTexture';
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import useEnemyRotation from './useEnemyRotation';
import useEnemyPosition from './useEnemyPosition';
import type PlayerProjType from '../../types/PlayerProjType';
import type EnemyProperties from '../../types/EnemiesProperties';

interface EnemyProps {
  enemyProps: EnemyProperties;
  setEnemyHealthById: (id: number, health: number) => void;
  playerPosition: {
    x: number;
    y: number;
  };
  playerProj: RefObject<PlayerProjType[]>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const Enemy: React.FC<EnemyProps> = ({ enemyProps, setEnemyHealthById, playerPosition, playerProj, setScore }) => {
  const texture = useLoadTexture(Mouse);
  const enemySize = 75;

  // Position Update
  const randomPosition = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
  const [position, setPosition] = useState(randomPosition);
  useEnemyPosition(position, setPosition, playerPosition);

  // Rotation Update
  const [rotation, setRotation] = useState(0);
  useEnemyRotation(setRotation, playerPosition, position);

  const frame = useRef<number>(0);
  const checkCollision = useCallback(() => {
    playerProj.current.forEach((proj) => {
      const dx = position.x - proj.x;
      const dy = position.y - proj.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < enemySize / 2) {
        // Collision detected
        if (enemyProps.health - proj.damage == 0) setScore((prev) => prev + 1);
        setEnemyHealthById(enemyProps.id, enemyProps.health - proj.damage);
        console.log('Collision detected!', proj.id);
        // Handle collision (e.g., reduce health, remove projectile, etc.)
        playerProj.current = playerProj.current.filter((p) => p.id !== proj.id);
      }
    });
    frame.current = requestAnimationFrame(checkCollision);
  }, [setEnemyHealthById, enemyProps.id, enemyProps.health, position, playerProj, setScore]);

  // Collision with Player Projectile
  useEffect(() => {
    frame.current = requestAnimationFrame(checkCollision);
    return () => {
      cancelAnimationFrame(frame.current);
    };
  });

  return (
    <>
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
    </>
  );
};

export default Enemy;
