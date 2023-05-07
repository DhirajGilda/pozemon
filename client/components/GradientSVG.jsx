function GradientSVG(props) {
  let gradientTransform = `rotate(${props.rotation})`;

  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={props.idCSS} gradientTransform={gradientTransform}>
          <stop offset="0%" stopColor={props.startColor} />
          <stop offset="100%" stopColor={props.endColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GradientSVG;
