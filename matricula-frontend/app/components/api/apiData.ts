import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5454",
    headers: {
        "Content-Type": "application/json",
    },
});

const fetchData = async <T,>(
    url: string,
    options?: AxiosRequestConfig
): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance(url, options);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango de 2xx
            const statusCode = error.response.status;
            const errorMessage = error.response.data?.message || "Error desconocido";
            // Aquí puedes lanzar un error con el código y mensaje
            throw { statusCode, errorMessage };
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error("No response received:", error.request);
        } else {
            // Algo sucedió al configurar la solicitud
            console.error("Error setting up request:", error.message);
        }
        // En caso de otros errores
        throw { statusCode: 500, errorMessage: "No se pudo obtener la data" };
    }
};

export default fetchData;
