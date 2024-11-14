import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Users } from 'lucide-react';

const AdminView = () => {
  const [activeTab, setActiveTab] = useState('productos');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
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
                  onClick={() => setActiveTab('roles')}
                  className={`${
                    activeTab === 'roles'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Gestión de Roles
                </button>
              </nav>
            </div>
            {activeTab === 'productos' && <ProductosTab />}
            {activeTab === 'roles' && <RolesTab />}
          </div>
        </div>
      </main>
    </div>
  );
};

const ProductosTab = () => {
  // Aquí iría la lógica para manejar productos
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Lista de Productos</h2>
        <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-5 w-5" />
          Agregar Producto
        </button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {/* Aquí iría la lista de productos */}
          <li className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/40" alt="" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">Café Americano</div>
                <div className="text-sm text-gray-500">$2.50</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-indigo-600 hover:text-indigo-900">
                <Edit className="h-5 w-5" />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </li>
          {/* Más productos aquí */}
        </ul>
      </div>
    </div>
  );
};

const RolesTab = () => {
  // Aquí iría la lógica para manejar roles
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestión de Roles y Personal</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          <li className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-gray-400" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">Juan Pérez</div>
                <div className="text-sm text-gray-500">Mesero - Sede Central</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Mesero</option>
                <option>Cajero</option>
                <option>Admin</option>
              </select>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Sede Central</option>
                <option>Sede Norte</option>
                <option>Sede Sur</option>
              </select>
            </div>
          </li>
          {/* Más personal aquí */}
        </ul>
      </div>
    </div>
  );
};

export default AdminView;