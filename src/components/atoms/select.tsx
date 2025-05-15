'use client';

import { MenuItem, Select as MuiSelect, SelectChangeEvent, SelectProps } from '@mui/material';

export type OptionItem = {
  label: string;
  value: string;
};

type SelectCustomProps = {
  options: OptionItem[];
};

const Select = (props: SelectProps & SelectCustomProps) => {
  return (
    <MuiSelect {...props}>
      {props.options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default Select;
