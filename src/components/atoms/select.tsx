'use client';

import { MenuItem, Select as MuiSelect, SelectProps } from '@mui/material';

export type OptionItem = {
    label: string;
    value: string;
};

const Select = (props: SelectProps & { options: OptionItem[] }) => {
    return <MuiSelect {...props} >
        {props.options.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
    </MuiSelect>;
};

export default Select;