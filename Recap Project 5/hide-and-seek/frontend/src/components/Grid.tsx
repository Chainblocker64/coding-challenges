import type { JSX } from "react/jsx-runtime";

export default function Grid() {
  const GRID_SIZE = 10;
  const rows: JSX.Element[] = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      rows.push(<span key={`y${y}x${x}`}>{`Y: ${y}, X: ${x}`}</span>);
    }
  }

  return <div>{rows}</div>;
}
