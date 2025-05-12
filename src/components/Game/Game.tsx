import { useRef, useState } from 'react';

import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite, Text } from 'pixi.js';

extend({ Container, Graphics, Sprite, Text });

import Player from '../Player/Player';
import Enemy from '../Enemy/Enemy';
import type PlayerProjType from './../../types/PlayerProjType';
import type EnemyProperties from '../../types/EnemiesProperties';

const Game = () => {
  const [score, setScore] = useState<number>(0);

  const [playerPosition, setplayerPosition] = useState({
    x: document.documentElement.clientWidth / 2,
    y: document.documentElement.clientHeight / 2
  });
  const playerProj = useRef<PlayerProjType[]>([]);

  const randomizeEnemies = (enemiesCount: number): EnemyProperties[] => {
    return Array.from({ length: enemiesCount }, (_, index) => ({
      id: index,
      health: 100
    }));
  };
  const [enemies, setEnemies] = useState<EnemyProperties[]>(randomizeEnemies(15));
  const setEnemyHealthById = (id: number, health: number) => {
    setEnemies((prevEnemies) => prevEnemies.map((enemy) => (enemy.id === id ? { ...enemy, health } : enemy)));
  };

  const divRef = useRef(null);
  return (
    <div ref={divRef} style={{ width: '100vw', height: '100vh' }}>
      <Application resizeTo={divRef} autoStart>
        <pixiText text={`Score: ${score}`} style={{ fill: 'white' }} />
        <Player playerProj={playerProj} position={playerPosition} setPosition={setplayerPosition} />
        {enemies.map((enemy, index) => {
          return enemy.health > 0 ? (
            <Enemy
              key={index}
              enemyProps={enemy as EnemyProperties}
              setEnemyHealthById={setEnemyHealthById}
              playerPosition={{
                x: playerPosition.x,
                y: playerPosition.y
              }}
              playerProj={playerProj}
              setScore={setScore}
            />
          ) : null;
        })}
      </Application>
    </div>
  );
};

export default Game;
