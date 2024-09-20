"use client";

import { useEffect, useState } from "react";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5454',
  headers: {
    'Content-Type': 'application/json',
  },
});

type IBanco = {
  id: number;
  nombre: string;
  direccion: string;
  codigo: string;
}

export default function Home() {
  //variable
  const [bancos, setBancos] = useState<IBanco[] | null>(null);

  useEffect(() => {
    
    //funcion de flecha
    const obtenerBancos = async () => {
      try {
        const response = await axiosInstance('/obtner-bancos', {});
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    obtenerBancos();

  }, []);

  return (
    <div>
      {/* {
        usuarios?.map((item) => (
          <h3>{item.nombre} {item.apellido}</h3>
        ))
      } */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Dni</th>
            <th scope="col">Edad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>          
        </tbody>
      </table>
    </div>
  );
}
