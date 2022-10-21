import axios from "axios";
import { createContext, useState } from "react";

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
	console.log();

	const [busqueda, setBusqueda] = useState({
		ciudad: "",
		pais: "",
	});
	const [resultado, setResultado] = useState({});
	const [cargando, setCargando] = useState(false);
	const [sinResultados, setSinResultados] = useState("");

	const datosBusqueda = (e) => {
		setBusqueda({
			...busqueda,
			[e.target.name]: e.target.value,
		});
	};

	const consultarClima = async (datos) => {
		setCargando(true);
		try {
			const { ciudad, pais } = datos;

			const appId = import.meta.env.VITE_API_KEY;

			const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

			const { data } = await axios(url);

			const { lon, lat } = data.coord;

			const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

			const { data: clima } = await axios(urlClima);

			setResultado(clima);
		} catch (error) {
			setResultado({});
			setSinResultados("No hay resultados");
		} finally {
			setCargando(false);
		}
	};
	return (
		<ClimaContext.Provider
			value={{ busqueda, datosBusqueda, consultarClima, resultado, cargando, sinResultados }}
		>
			{children}
		</ClimaContext.Provider>
	);
};

export { ClimaProvider };

export default ClimaContext;
