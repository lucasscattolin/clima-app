import useClima from "../hooks/useClima";
import Error from "./Error";
import Formulario from "./Formulario";
import Loading from "./Loading";
import Resultado from "./Resultado";

const AppClima = () => {
	const { resultado, cargando, sinResultados } = useClima();
	return (
		<>
			<main className="dos-columnas">
				<Formulario />

				{cargando ? (
					<Loading />
				) : resultado?.name ? (
					<Resultado />
				) : sinResultados ? (
					<Error>
						<p>{sinResultados}</p>
					</Error>
				) : (
					<p></p>
				)}
			</main>
		</>
	);
};

export default AppClima;
