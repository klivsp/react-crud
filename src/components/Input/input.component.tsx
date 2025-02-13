import React from 'react';
import './input.style.css';

interface CustomInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, type, value, onChange, placeholder, required = false }) => {
  return (
    <div className="custom-input-container">
      <label htmlFor={label} className="input-label">
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="custom-input"
      />
    </div>
  );
};

export default CustomInput;
