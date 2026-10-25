export default function BrandIcon({
  icon,
  size = 24,
  color,
  className = '',
  ...props
}) {
  // Fallback if the icon object isn't passed correctly
  if (!icon || !icon.path) return null;

  // Use the custom color prop, or fallback to the brand's official hex color, or 'currentColor'
  const fillColor = color || (icon.hex ? `#${icon.hex}` : 'currentColor');

  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fillColor}
      className={className}
      {...props}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}