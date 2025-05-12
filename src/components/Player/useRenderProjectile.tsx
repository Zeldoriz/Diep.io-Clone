import { useEffect, type RefObject } from 'react';
import type PlayerProjType from '../../types/PlayerProjType';

interface UseRenderProjectileProps {
  playerProj: RefObject<PlayerProjType[]>;
  screenWidth: number;
  screenHeight: number;
}

const useRenderProjectile = ({ playerProj, screenWidth, screenHeight }: UseRenderProjectileProps) => {
  useEffect(() => {
    const updateProjectiles = () => {
      playerProj.current = playerProj.current
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
  }, [screenHeight, screenWidth, playerProj]);
};

export default useRenderProjectile;
