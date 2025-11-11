import MatrixRain from "react-matrix-rain";

export default function App() {
  const searchParams = decodeURIComponent(window.location.search)
  const props = JSON.parse(searchParams.slice(1));
  return <MatrixRain {...props} />;
}
