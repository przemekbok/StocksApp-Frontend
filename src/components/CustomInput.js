import React from 'react';
import { TextField } from '@material-ui/core';

const CustomInput = (props) => {
  const {
    input: { value, onChange },
  } = props;
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      autoComplete={props.name}
      placeholder={props.placeholder}
      type={props.type}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomInput;
