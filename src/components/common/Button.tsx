import React, { useState, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  animate?: boolean;
  gradient?: boolean;
  neon?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  animate = true,
  gradient = false,
  neon = false,
  className = '',
  disabled,
  children,
  ...props
}, ref) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = `
    relative overflow-hidden
    inline-flex items-center justify-center
    font-semibold
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    ${animate ? 'transform hover:scale-105 active:scale-95' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
  `;

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs rounded-lg',
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-2xl',
  };

  const variantClasses = {
    primary: gradient 
      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary: gradient
      ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl'
      : 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl',
    success: gradient
      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
      : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl',
    danger: gradient
      ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
      : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
    warning: gradient
      ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
      : 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-300 hover:text-white border border-white/20 hover:border-white/40',
    outline: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 shadow-glass',
  };

  const neonClasses = {
    primary: 'shadow-neon-blue',
    secondary: 'shadow-gray-500/50',
    success: 'shadow-neon-green',
    danger: 'shadow-red-500/50',
    warning: 'shadow-yellow-500/50',
    ghost: 'hover:shadow-white/20',
    outline: 'hover:shadow-neon-blue',
    glass: 'shadow-glass',
  };

  const focusClasses = {
    primary: 'focus:ring-blue-500',
    secondary: 'focus:ring-gray-500',
    success: 'focus:ring-green-500',
    danger: 'focus:ring-red-500',
    warning: 'focus:ring-yellow-500',
    ghost: 'focus:ring-white',
    outline: 'focus:ring-blue-500',
    glass: 'focus:ring-white/50',
  };

  const buttonClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    focusClasses[variant],
    neon ? neonClasses[variant] : '',
    className
  ].join(' ');

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      {...props}
    >
      {/* Background animation */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
      </div>

      {/* Ripple effect */}
      {isPressed && animate && (
        <div className="absolute inset-0 rounded-inherit">
          <div className="absolute inset-0 rounded-inherit bg-white/20 animate-ping" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center space-x-2">
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        
        {icon && iconPosition === 'left' && !loading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        
        <span className="truncate">{children}</span>
        
        {icon && iconPosition === 'right' && !loading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </div>

      {/* Pulse ring for important actions */}
      {variant === 'primary' && animate && (
        <div className="absolute inset-0 rounded-inherit border-2 border-blue-400 opacity-0 hover:opacity-20 animate-pulse" />
      )}
    </button>
  );
});

Button.displayName = 'Button';

// Specialized button variants
export const PrimaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="primary" gradient {...props} />
);

export const SecondaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="secondary" {...props} />
);

export const SuccessButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="success" gradient {...props} />
);

export const DangerButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="danger" gradient {...props} />
);

export const GlassButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="glass" {...props} />
);

export const NeonButton = (props: Omit<ButtonProps, 'variant' | 'neon'>) => (
  <Button variant="primary" neon gradient {...props} />
); 