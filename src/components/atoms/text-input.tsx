'use client';

import { TextField as MuiTextInput, TextFieldProps } from '@mui/material';

const TextInput = (props: TextFieldProps) => {
  return <MuiTextInput {...props} />;
};

export default TextInput;
