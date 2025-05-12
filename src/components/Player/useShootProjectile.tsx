import { useState, useEffect, type RefObject } from 'react';
import type PlayerProjType from '../../types/PlayerProjType';

interface useShootProjectileProps {
  playerProj: RefObject<PlayerProjType[]>;
  position: {
    x: number;
    y: number;
  };
}

const useShootProjectile = ({ playerProj, position }: useShootProjectileProps) => {
  const [, forceUpdate] = useState(0);
  const projSpeed = 7;

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const angle = Math.atan2(e.clientY - position.y, e.clientX - position.x);
      const vx = Math.cos(angle) * projSpeed;
      const vy = Math.sin(angle) * projSpeed;

      playerProj.current.push({ id: Date.now(), x: position.x, y: position.y, vx, vy });
      forceUpdate((prev) => prev + 1);
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [position, playerProj]);
};

export default useShootProjectile;
