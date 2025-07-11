import axiosInstance from '../../helpers/axiosConfig.js';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const NuevaContrasena = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [inputs, setInputs] = useState({ nuevaContrasena: "", confirma: "" });

    const handleInputChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nuevaContrasena, confirma } = inputs;

        if (nuevaContrasena !== confirma) {
            Swal.fire({
                icon: "error",
                title: "Las contraseñas no coinciden",
                text: "Por favor verifique los datos.",
                confirmButtonColor: '#FC3F3F',
                customClass: {
                    container: 'swal2-container',
                    popup: 'swal2-popup'
                }
            });
            return;
        }

        try {
            console.log('🔍 Enviando petición:', {
                url: `${import.meta.env.VITE_API_URL}/olvidar-contrasena/restablecer-contrasena`,
                token: token?.substring(0, 20) + '...',
                nuevaContrasena: nuevaContrasena ? '[DEFINIDA]' : '[VACÍA]'
            });
            
            const response = await axiosInstance.post(
                `${import.meta.env.VITE_API_URL}/olvidar-contrasena/test-post`,
                { token, nuevaContrasena }
            );

            console.log('✅ Respuesta exitosa:', response.data);

            Swal.fire({
                icon: "success",
                iconColor: "#007BFF",
                title: response.data.mensaje,
                confirmButtonColor: '#81d4fa',
                customClass: {
                    container: 'swal2-container',
                    popup: 'swal2-popup'
                }
            }).then(() => {
                navigate('/login');
            });

        } catch (error) {
            console.error('❌ Error completo:', error);
            console.error('❌ Error response:', error.response);
            console.error('❌ Error data:', error.response?.data);
            console.error('❌ Error status:', error.response?.status);
            
            const mensaje = error.response?.data?.mensaje || "Error inesperado";
            Swal.fire({
                icon: "error",
                title: mensaje,
                text: "Por favor verifique los datos.",
                confirmButtonColor: '#FC3F3F',
                customClass: {
                    container: 'swal2-container',
                    popup: 'swal2-popup'
                }
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className='shadow-lg text-3xl p-10 border border-neutral-400/40 m-4 shadow-lg shadow-[#1565c023] rounded-lg'>
                <h1 className='font-bold m-1'>Restablecer Contraseña</h1>
                <div className='m-5'>
                    <Label htmlFor="nuevaContrasena">Nueva Contraseña</Label>
                    <Input
                        name="nuevaContrasena"
                        type="password"
                        placeholder="Nueva Contraseña"
                        onChange={handleInputChange}
                        value={inputs.nuevaContrasena}
                        required
                    />
                </div>
                <div className='m-5'>
                    <Label htmlFor="confirma">Confirmar Contraseña</Label>
                    <Input
                        name="confirma"
                        type="password"
                        placeholder="Confirmar Contraseña"
                        onChange={handleInputChange}
                        value={inputs.confirma}
                        required
                    />
                </div>
                <div className='text-center pt-2'>
                    <Button type="submit">Enviar Solicitud</Button>
                </div>               
            </form>
        </div>
    );
};

export default NuevaContrasena;
