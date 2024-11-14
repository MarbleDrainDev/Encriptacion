import React, { useState } from 'react';
import { DollarSign, ShoppingCart } from 'lucide-react';

const CajeroView = () => {
  const [activeTab, setActiveTab] = useState('pedidos');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Cajero</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('pedidos')}
                  className={`${
                    activeTab === 'pedidos'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Pedidos Activos
                </button>
                <button
                  onClick={() => setActiveTab('historial')}
                  className={`${
                    activeTab === 'historial'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Historial de Ventas
                </button>
              </nav>
            </div>
            {activeTab === 'pedidos' && <PedidosActivosTab />}
            {activeTab === 'historial' && <HistorialVentasTab />}
          </div>
        </div>
      </main>
    </div>
  );
};

const PedidosActivosTab = () => {
  const pedidosActivos = [
    { id: 1, mesa: 2, total: 25.50, items: [
      { nombre: 'Café Americano', cantidad: 2, precio: 5.00 },
      { nombre: 'Croissant', cantidad: 1, precio: 3.50 },
      { nombre: 'Jugo de Naranja', cantidad: 2, precio: 6.00 }
    ]},
    // Más pedidos aquí...
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Pedidos Activos</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {pedidosActivos.map((pedido) => (
            <li key={pedido.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    Pedido #{pedido.id} - Mesa {pedido.mesa}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Total: ${pedido.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <ShoppingCart className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {pedido.items.length} items
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {/* Lógica para procesar pago */}}
                    >
                      Procesar Pago
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const HistorialVentasTab = () => {
  const ventas = [
    { id: 1, fecha: '2023-05-10', total: 125.50, items: 5 },
    { id: 2, fecha: '2023-05-09', total: 87.25, items: 3 },
    // Más ventas aquí...
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Historial de Ventas</h2>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ventas.map((venta) => (
                    <tr key={venta.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {venta.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {venta.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${venta.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {venta.items}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CajeroView;