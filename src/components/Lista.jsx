import { useSelector } from "react-redux";

function Lista() {
  const datos = useSelector((state) => state.datos);

  return (
    <ul>
      {datos.map((d, i) => (
        <li key={i}>{d.texto}</li>
      ))}
    </ul>
  );
}

export default Lista;
