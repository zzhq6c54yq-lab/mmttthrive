import React from 'react';
import Page from '@/components/Page';
import WhisperWall from '@/components/unburdened/WhisperWall';

const Unburdened: React.FC = () => {
  return (
    <Page title="Unburdened" showBackButton={true}>
      <WhisperWall />
    </Page>
  );
};

export default Unburdened;
