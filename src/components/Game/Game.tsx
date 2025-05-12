import { useRef, useState } from 'react';

import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite } from 'pixi.js';
import GameContainer from '../GameContainer/GameContainer';

extend({ Container, Graphics, Sprite });

import Player from '../Player/Player';
import Enemy from '../Enemy/Enemy';
import type PlayerProjType from './../../types/PlayerProjType';

const Game = () => {
  const [playerPosition, setplayerPosition] = useState({
    x: document.documentElement.clientWidth / 2,
    y: document.documentElement.clientHeight / 2
  });
  const playerProj = useRef<PlayerProjType[]>([]);

  // const enemyProj = useRef<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);
  const divRef = useRef(null);
  return (
    <div ref={divRef} style={{ width: '100vw', height: '100vh' }}>
      <Application resizeTo={divRef} autoStart>
        <GameContainer>
          <Player playerProj={playerProj} position={playerPosition} setPosition={setplayerPosition} />
          <Enemy
            enemyProps={{
              id: 1,
              x: 100,
              y: 100,
              vx: 0,
              vy: 0
            }}
            playerPosition={{
              x: playerPosition.x,
              y: playerPosition.y
            }}
            playerProj={playerProj}
          />
        </GameContainer>
      </Application>
    </div>
  );
};

export default Game;
