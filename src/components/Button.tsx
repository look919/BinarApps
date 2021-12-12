import React, { FC } from 'react';
import { Button as MUIButton, ButtonProps } from '@material-ui/core';

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <MUIButton variant='outlined' color='primary' {...props}>
      {children}
    </MUIButton>
  );
};
