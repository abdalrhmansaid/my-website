import { forwardRef } from 'react';

const VARIANTS = {
  primary: 'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-light)] active:scale-[0.98]',
  brass: 'bg-[var(--color-brass)] text-[#221704] hover:bg-[var(--color-brass-light)] active:scale-[0.98]',
  outline: 'border border-themed text-primary hover:bg-surface-2',
  ghost: 'text-primary hover:bg-surface-2',
  danger: 'bg-[var(--color-danger)] text-white hover:opacity-90',
};

const SIZES = {
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-6 py-3.5 gap-2',
};

const Button = forwardRef(function Button(
  { as: Component = 'button', variant = 'primary', size = 'md', className = '', children, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;
