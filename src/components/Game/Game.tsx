import { useRef } from 'react';

import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite } from 'pixi.js';
import GameContainer from '../GameContainer/GameContainer';

extend({ Container, Graphics, Sprite });

import Player from '../Player/Player';

const Game = () => {
  const divRef = useRef(null);
  return (
    <div ref={divRef} style={{ width: '100vw', height: '100vh' }}>
      <Application resizeTo={divRef} autoStart>
        <GameContainer>
          <Player />
        </GameContainer>
      </Application>
    </div>
  );
};

export default Game;
