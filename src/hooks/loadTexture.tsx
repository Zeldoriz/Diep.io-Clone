import { Assets, Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

const useLoadTexture = (url: string) => {
  const [texture, setTexture] = useState<Texture>(Texture.EMPTY);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load(url).then((texture) => {
        setTexture(texture);
      });
    }
  }, [texture, url]);
  return texture;
};

export default useLoadTexture;
