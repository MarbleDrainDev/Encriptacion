import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Realizar la llamada a la API para registrar al usuario
      const response = await fetch('https://localhost:7096/api/User/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password, // Solo enviar la contraseña
        }),
      });

      if (response.ok) {
        toast.success('¡Registro exitoso!');
        navigate('/'); // Redirigir al inicio o página de login después del registro exitoso
      } else {
        toast.error('¡Error al registrar! Por favor, intenta de nuevo.');
      }
    } catch (error) {
      toast.error('¡Error al registrar! Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Menu
        </button>

        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-8 shadow-2xl">
          <div className="flex justify-center mb-8">
            <UserPlus className="w-12 h-12 text-green-400" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-2 px-4 transition-colors duration-200 ease-in-out"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-2 px-4 transition-colors duration-200 ease-in-out"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-2 px-4 transition-colors duration-200 ease-in-out"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-2 px-4 transition-colors duration-200 ease-in-out"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            {/* Mostrar mensaje de error si las contraseñas no coinciden */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-200"
              type="submit"
            >
              Register
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
