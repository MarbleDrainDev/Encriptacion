import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Users, DollarSign, Package } from 'lucide-react';

const HomePage = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-r from-brown-100 to-brown-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-brown-800 mb-8">Cafetería Virtual</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MetricCard icon={<Coffee />} title="Pedidos abiertos hoy" value="10" />
        <MetricCard icon={<DollarSign />} title="Ventas cerradas" value="15" />
        <MetricCard icon={<Package />} title="Productos en inventario" value="200" />
        <MetricCard icon={<Users />} title="Clientes atendidos" value="50" />
      </div>

      <div className="space-y-4 w-full max-w-md">
        <Link to="/login" className="btn-primary w-full">
          Iniciar Sesión
        </Link>
        <Link to="/instructions" className="btn-secondary w-full">
          Instrucciones por Roles
        </Link>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-brown-700 mb-2">Noticias del Día</h2>
        <p className="text-brown-600">¡Nueva promoción de café! 2x1 en todos los expresos.</p>
        <p className="text-brown-500 mt-2">Fecha: {currentDate}</p>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
    <div className="text-brown-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-brown-700">{title}</h3>
      <p className="text-2xl font-bold text-brown-800">{value}</p>
    </div>
  </div>
);

export default HomePage;