import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("red");
  const [colors, setColors] = useState(["red", "yellow", "green"]);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;

    const interval = setInterval(() => {
      setColor((prev) => {
        const currentIndex = colors.indexOf(prev);
        return colors[(currentIndex + 1) % colors.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [auto, colors]);

  const togglePurple = () => {
    if (colors.includes("purple")) {
      setColors(colors.filter((col) => col !== "purple"));
    } else {
      setColors([...colors, "purple"]);
    }
  };

  return (
    <div className="traffic-light">
      {colors.map((col) => (
        <div
          key={col}
          className={`light ${col} ${color === col ? "glow" : ""}`}
          onClick={() => setColor(col)}
        ></div>
      ))}

      <button onClick={() => setAuto(!auto)}>
        {auto ? "Detener Cambio Automático" : "Iniciar Cambio Automático"}
      </button>
      <button onClick={togglePurple}>
        {colors.includes("purple") ? "Quitar Púrpura" : "Agregar Púrpura"}
      </button>
    </div>
  );
}

export default App;
