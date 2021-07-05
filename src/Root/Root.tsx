import { Card, Elevation } from '@blueprintjs/core';
import React from 'react';
import { Body } from './Body/Body';

export const Root: React.FC = () => {
  return (
    <Card elevation={Elevation.TWO}>
      {/* <Header /> */}
      <Body />
      {/* <Footer /> */}
    </Card>
  );
};
