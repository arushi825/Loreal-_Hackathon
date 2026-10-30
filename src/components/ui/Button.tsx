import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-forest-700 text-white shadow-sm hover:bg-forest-600 hover:shadow-lift active:scale-[0.98]',
  secondary:
    'bg-white text-forest-800 ring-1 ring-inset ring-sand-300 hover:bg-sand-50 hover:ring-sage-400 active:scale-[0.98]',
  ghost: 'text-forest-700 hover:bg-forest-50',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export default function Button({ variant = 'primary', icon, className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
