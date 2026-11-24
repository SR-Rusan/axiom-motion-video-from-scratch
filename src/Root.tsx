import React from 'react';
import { Composition } from 'remotion';
import { AxiomFromScratch } from './AxiomFilm';

export const Root: React.FC = () => (
  <>
    <Composition
      id="Axiom-From-Scratch-Vertical"
      component={AxiomFromScratch}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="Axiom-From-Scratch-Landscape"
      component={AxiomFromScratch}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
