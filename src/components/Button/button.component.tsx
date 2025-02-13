import React from 'react';
import { Plus, Trash } from 'lucide-react';
import './button.style.css';

const icons = {
  add: Plus,
  delete: Trash,
};

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  placeholder?: string;
  iconName?: keyof typeof icons;
  className?: string;
  onClick?: () => void;
}

function Button({ placeholder, iconName, onClick, type, className }: ButtonProps) {
  const Icon = iconName ? icons[iconName] : null;
  return (
    <button className={`button-style ${className}`} onClick={onClick} type={type}>
      {' '}
      {Icon && <Icon className="icon-style" />}
      {placeholder}
    </button>
  );
}

export default Button;
