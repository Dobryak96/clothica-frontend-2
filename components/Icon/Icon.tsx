import type { SVGProps } from 'react';

export type IconName =
  | 'logo'
  | 'menu'
  | 'close'
  | 'shopping-cart'
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'youtube'
  | 'chevron-left'
  | 'chevron-right'
  | 'keyboard-arrow-up'
  | 'keyboard-arrow-down'
  | 'arrow-back'
  | 'arrow-forward'
  | 'star'
  | 'star-filled'
  | 'star-half'
  | 'delete'
  | 'comment';

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export default function Icon({ name, size = 24, width, height, ...props }: IconProps) {
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
