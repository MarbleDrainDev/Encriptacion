import React, { useState } from 'react';
import { Coffee, ShoppingCart } from 'lucide-react';

const MeseroView = () => {
  const [activeTab, setActiveTab] = useState('mesas');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Mesero</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('mesas')}
                  className={`${
                    activeTab === 'mesas'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Mesas
                </button>
                <button
                  onClick={() => setActiveTab('productos')}
                  className={`${
                    activeTab === 'productos'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Productos
                </button>
                <button
                  onClick={() => setActiveTab('ventas')}
                  className={`${
                    activeTab === 'ventas'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Ventas
                </button>
              </nav>
            </div>
            {activeTab === 'mesas' && <MesasTab />}
            {activeTab === 'productos' && <ProductosTab />}
            {activeTab === 'ventas' && <VentasTab />}
          </div>
        </div>
      </main>
    </div>
  );
};

const MesasTab = () => {
  const mesas = [
    { id: 1, numero: 1, estado: 'libre' },
    { id: 2, numero: 2, estado: 'ocupada' },
    { id: 3, numero: 3, estado: 'libre' },
    { id: 4, numero: 4, estado: 'ocupada' },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {mesas.map((mesa) => (
        <div
          key={mesa.id}
          className={`bg-white overflow-hidden shadow rounded-lg ${
            mesa.estado === 'ocupada' ? 'border-red-500 border-2' : ''
          }`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Mesa {mesa.numero}</dt>
                  <dd className="text-lg font-medium text-gray-900">{mesa.estado}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <button
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => {/* Lógica para abrir pedido */}}
              >
                {mesa.estado === 'libre' ? 'Abrir Pedido' : 'Ver Pedido'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductosTab = () => {
  // Aquí iría la lista de productos disponibles
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Lista de Productos</h2>
      {/* Lista de productos aquí */}
    </div>
  );
};

const VentasTab = () => {
  // Aquí iría la lista de ventas
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Lista de Ventas</h2>
      {/* Lista de ventas aquí */}
    </div>
  );
};

export default MeseroView;