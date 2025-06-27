import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  icon = null,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "font-display font-semibold rounded-lg transition-all duration-150 stone-texture carved-text shadow-raised border-2 border-secondary/30";
  
  const variants = {
    primary: "bg-gradient-to-b from-primary to-primary/80 text-secondary hover:from-secondary hover:to-secondary/80 hover:text-primary",
    secondary: "bg-gradient-to-b from-surface-50 to-surface-100 text-secondary hover:from-secondary hover:to-secondary/80 hover:text-surface-50",
    danger: "bg-gradient-to-b from-error to-error/80 text-white hover:from-error/80 hover:to-error",
    outline: "bg-transparent border-secondary text-secondary hover:bg-secondary hover:text-surface-50"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-3">
        {icon && <ApperIcon name={icon} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
        {children}
      </div>
    </motion.button>
  );
};

export default Button;