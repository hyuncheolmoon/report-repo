'use client';

import { TextField as MuiTextarea, TextFieldProps } from '@mui/material';


const Textarea = (props: TextFieldProps) => {
    return <MuiTextarea {...props} />;
};

export default Textarea;
