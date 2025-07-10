import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sena from '../../assets/Sena.png';
import useLogin from '../../hooks/useLogin';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import useValidation from '@/hooks/useValidation';
import fondoInicio from '../../assets/fondo-inicio.avif';

export const Login = () => {
  const navigate = useNavigate();
  const initialData = { documento: '', contrasena: '' };
  const [inputs, setInputs] = useState(initialData);
  const [colorTheme] = useState('white');

  const validations = {
    documento: [
      { validate: v => v.trim() !== '', message: 'El número de documento es obligatorio.' },
      { validate: v => /^[0-9]+$/.test(v), message: 'Debe contener solo números.' }
    ],
    contrasena: [
      { validate: v => v.trim() !== '', message: 'La contraseña es obligatoria.' }
    ]
  };
  const { validateInputs } = useValidation(inputs, validations);

  const handleInputChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = () => {
    navigate('/olvidar-contrasena');
  };

  // Aquí llamamos a useLogin pasando SOLO la ruta "login"
  const handleSubmit = useLogin('login', inputs, validations);

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-4 w-full bg-white`}
      style={{
        backgroundImage: `url(${fondoInicio})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden max-w-4xl w-full bg-white text-black">
        <div className="flex flex-col justify-center items-center p-8 md:w-1/2 bg-gray-600">
          <h1 className="text-4xl font-bold mb-4 text-white">Bienvenid@</h1>
          <p className="mb-6 text-center text-white">
            Este software gestiona los préstamos de herramientas del Sena CIAA.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center p-8 md:w-1/2">
          <img src={Sena} alt="Logo Sena" className="w-20 h-auto mb-4" />
          <h2 className="text-2xl font-bold mb-6">Inicio de sesión</h2>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="documento" className="block">Número de Documento</Label>
              <Input
                name="documento"
                placeholder="Documento"
                className="w-full mt-1 border-gray-400"
                onChange={handleInputChange}
                value={inputs.documento}
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="contrasena" className="block">Contraseña</Label>
              <Input
                name="contrasena"
                type="password"
                placeholder="Contraseña"
                className="w-full mt-1 border-gray-400"
                onChange={handleInputChange}
                value={inputs.contrasena}
              />
            </div>
            <Button type="submit" className="w-full py-2 rounded-lg text-1xl">
              Iniciar sesión
            </Button>
            <p
              className="mt-4 text-center text-gray-700 cursor-pointer"
              onClick={handleForgotPassword}
            >
              ¿Olvidaste tu contraseña?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
