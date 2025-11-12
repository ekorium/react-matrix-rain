import MatrixRain from "react-matrix-rain";

export default function App() {
  try {
    const hash = window.location.hash.slice(1)
    const props = JSON.parse(decodeURIComponent(hash));
    return <MatrixRain {...props} />;
  } catch {
    return <MatrixRain />;
  }
}
