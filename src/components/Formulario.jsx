import { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarDato } from "../store/datosSlice";
import { guardarDato } from "../firebase/firestore";

function Formulario() {
  const [texto, setTexto] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoDato = { texto, fecha: Date.now() };
    dispatch(agregarDato(nuevoDato));
    await guardarDato(nuevoDato);
    setTexto("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe algo"
      />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default Formulario;
