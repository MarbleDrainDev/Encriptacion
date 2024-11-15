import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const Desencriptador: React.FC = () => {
    const navigate = useNavigate();
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const handleDecrypt = async () => {
        try {
            const response = await fetch('https://localhost:7096/api/User/decrypt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ encryptedText }), // Enviar como objeto JSON
            });

            if (response.ok) {
                const data = await response.json();
                setDecryptedText(data.decryptedText);
            } else {
                toast.error('Error al desencriptar el texto.');
            }
        } catch (error) {
            toast.error('Error al desencriptar el texto.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <button
                onClick={() => navigate('/')}
                className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Menu
            </button>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-8 shadow-2xl">
                <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Desencriptador
                </h1>
                <input
                    type="text"
                    value={encryptedText}
                    onChange={(e) => setEncryptedText(e.target.value)}
                    placeholder="Introduce la contraseña encriptada"
                    className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 text-base outline-none text-gray-100 py-2 px-4 transition-colors duration-200 ease-in-out mb-4"
                />
                <button
                    onClick={handleDecrypt}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
                >
                    Desencriptar
                </button>
                {decryptedText && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold text-center mb-2 text-white">Texto Desencriptado:</h2>
                        <p className="text-center text-gray-400">{decryptedText}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Desencriptador;
