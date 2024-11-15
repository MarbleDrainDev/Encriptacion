import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Coffee, UserPlus, Users, LogIn } from 'lucide-react';

import { Code } from 'lucide-react';

const menuItems = [
  { title: 'Login', icon: LogIn, path: '/login', color: 'from-blue-500 to-blue-600' },
  { title: 'Register', icon: UserPlus, path: '/register', color: 'from-green-500 to-green-600' },
  // { title: 'Usuarios', icon: Code, path: '/users', color: 'from-yellow-500 to-yellow-600' },
  { title: 'Desencriptar', icon: Code, path: '/desencriptar', color: 'from-red-500 to-red-600' },
];

const SplashScreen = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev + 1) % menuItems.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
    } else if (e.key === 'Enter') {
      navigate(menuItems[selectedIndex].path);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mb-12 text-center"
      >
        <Coffee className="w-20 h-20 text-purple-400 mx-auto mb-4" />
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Prueba Encriptacion
        </h1>
      </motion.div>

      <div className="space-y-6 w-full max-w-md">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={false}
            animate={{
              scale: selectedIndex === index ? 1.1 : 1,
              x: selectedIndex === index ? 20 : 0,
            }}
            className={`
              cursor-pointer rounded-lg p-4
              ${selectedIndex === index 
                ? `bg-gradient-to-r ${item.color} shadow-lg shadow-purple-500/50` 
                : 'bg-gray-800 bg-opacity-50'}
              transition-all duration-300 ease-in-out
            `}
            onClick={() => {
              setSelectedIndex(index);
              navigate(item.path);
            }}
          >
            <div className="flex items-center space-x-4">
              <item.icon className={`w-6 h-6 ${selectedIndex === index ? 'text-white' : 'text-gray-400'}`} />
              <span className={`text-xl ${selectedIndex === index ? 'text-white font-bold' : 'text-gray-400'}`}>
                {item.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 text-gray-400 text-sm"
      >
        Use arrow keys to navigate and Enter to select
      </motion.div>
    </div>
  );
};

export default SplashScreen;