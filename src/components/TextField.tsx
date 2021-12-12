import React, { FC } from 'react';
import { TextField as MUITextField, TextFieldProps } from '@material-ui/core';

interface CustomProps {
  testId?: string;
}

type Props = CustomProps & TextFieldProps;

export const TextField: FC<Props> = props => {
  const { testId, inputProps, ...rest } = props;

  return <MUITextField variant='outlined' inputProps={{ 'data-testid': testId, ...inputProps }} {...rest} />;
};
