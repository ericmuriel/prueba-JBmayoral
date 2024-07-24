import React, { FC } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  [x: string]: any;
}

const Button: FC<ButtonProps> = ({ onClick, className, children, ...props }) => {
  const buttonClassName = className ? `${styles.button} ${className}` : styles.button;
  
  return (
    <button className={buttonClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;