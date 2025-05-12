import { type PropsWithChildren } from 'react';

interface GameContainerProps {
  children?: React.ReactNode;
}
const GameContainer = ({ children }: PropsWithChildren<GameContainerProps>) => {
  return <pixiContainer>{children}</pixiContainer>;
};

export default GameContainer;
