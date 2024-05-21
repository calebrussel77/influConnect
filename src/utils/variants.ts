export type Variant = 'error' | 'system' | 'info' | 'success' | 'warning';

export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const shadcnVariantColorMap: Record<Variant, string> = {
  error: 'hsl(var(--destructive))',
  system: 'hsl(var(--primary))',
  info: 'rgb(37 99 235)',
  success: 'rgb(22 163 74)',
  warning: 'rgb(217 119 6)',
};

export const getVariantColor = (variant: Variant) => {
  const key = shadcnVariantColorMap[variant];
  return key ? key : undefined;
};
