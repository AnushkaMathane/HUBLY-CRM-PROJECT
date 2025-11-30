export default function HomeIcon({ size = 22, color = "#6A6B70" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 96 960 960"
      fill="none"
      stroke={color}
      strokeWidth="60"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M240 840h120V600h240v240h120V528L480 336 240 528v312Z" />
    </svg>
  );
}
