import React, { useState, useEffect } from 'react';
import Mensaje from './Mensaje';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => {
                setUsuarios(data);
            })
            .catch((error) => {
                console.error('Error al obtener los usuarios:', error);
            });
    }, []);

    const handleUsuarioChange = (e) => setUsuario(e.target.value);
    const handleContraseñaChange = (e) => setContraseña(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuarioEncontrado = usuarios.find(
            (u) => u.email === usuario && u.username === contraseña
        );

        if (usuarioEncontrado) {
            setMensaje(`Bienvenido, ${usuarioEncontrado.name}`);
        } else {
            setMensaje('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div id="login">
            <form onSubmit={handleSubmit}>
                <label htmlFor="usuario">Usuario:</label>
                <input
                    type="text"
                    id="usuario"
                    value={usuario}
                    onChange={handleUsuarioChange}
                />
                <br />
                <label htmlFor="contraseña">Contraseña:</label>
                <input
                    type="password"
                    id="contraseña"
                    value={contraseña}
                    onChange={handleContraseñaChange}
                />
                <br />
                <button type="submit">Login</button>
            </form>

            {/**/}
            {mensaje && <Mensaje mensaje={mensaje} />}
        </div>
    );
};

export default Login;
