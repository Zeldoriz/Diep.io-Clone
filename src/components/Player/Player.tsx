import Cat from '../../assets/cat.jpg';
import useLoadTexture from '../../hooks/loadTexture';
import { useState, type RefObject } from 'react';
import usePlayerPosition from './usePlayerPosition';
import usePlayerRotation from './usePlayerRotation';
import useShootProjectile from './useShootProjectile';
import useRenderProjectile from './useRenderProjectile';
import type PlayerProjType from '../../types/PlayerProjType';

interface PlayerProps {
  playerProj: RefObject<PlayerProjType[]>;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

const Player: React.FC<PlayerProps> = ({ playerProj, position, setPosition }) => {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  const texture = useLoadTexture(Cat);

  // Rotation Update
  const [rotation, setRotation] = useState(0);
  usePlayerRotation(setRotation, position);

  // Player Movement
  usePlayerPosition(setPosition, screenWidth, screenHeight);

  // Projectile Update
  useShootProjectile({ playerProj, position });
  useRenderProjectile({ playerProj, screenWidth, screenHeight });

  return (
    <pixiContainer>
      {playerProj.current.map((proj) => (
        <pixiSprite texture={texture} x={proj.x} y={proj.y} width={20} height={20} anchor={0.5} />
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
