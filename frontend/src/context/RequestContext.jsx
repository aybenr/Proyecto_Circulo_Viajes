import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const API_URL = "http://localhost:3005/api";

const RequestContext = createContext();

const estadoInicial = {
  solicitudes: []
};

function solicitudesReducer(state, action) {
  switch (action.type) {
    case "CARGAR":
      return { ...state, solicitudes: action.payload };

    case "AGREGAR":
      return {
        ...state,
        solicitudes: [...state.solicitudes, action.payload]
      };

    case "ELIMINAR":
      return {
        ...state,
        solicitudes: state.solicitudes.filter(
          (solicitud) => solicitud.id !== action.payload
        )
      };

    default:
      return state;
  }
}

export function RequestProvider({ children }) {
  const [state, dispatch] = useReducer(
    solicitudesReducer,
    estadoInicial
  );

  useEffect(() => {
    axios.get(`${API_URL}/solicitudes`)
      .then((respuesta) => {
        dispatch({
          type: "CARGAR",
          payload: respuesta.data
        });
      })
      .catch((error) => {
        console.error("Error al cargar solicitudes:", error);
      });
  }, []);

  const agregarSolicitud = async (nuevaSolicitud) => {
    const respuesta = await axios.post(
      `${API_URL}/solicitudes`,
      nuevaSolicitud
    );

    dispatch({
      type: "AGREGAR",
      payload: respuesta.data
    });
  };

  const eliminarSolicitud = async (id) => {
    await axios.delete(`${API_URL}/solicitudes/${id}`);

    dispatch({
      type: "ELIMINAR",
      payload: id
    });
  };

  return (
    <RequestContext.Provider
      value={{
        solicitudes: state.solicitudes,
        agregarSolicitud,
        eliminarSolicitud
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  return useContext(RequestContext);
}