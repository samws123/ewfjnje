import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500 rounded-full',
        secondary: 'bg-black/5 text-neutral-900 hover:bg-black/10 focus:ring-gray-300 rounded-full',
        outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-300 rounded-md',
        ghost: 'text-gray-900 hover:bg-gray-100 focus:ring-gray-300 rounded-md',
        link: 'text-black underline-offset-4 hover:underline focus:ring-gray-300'
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-4 py-3.5 text-base',
        default: 'h-10 px-4 py-2 text-sm',
        icon: 'h-10 w-10'
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
export type { ButtonProps };
