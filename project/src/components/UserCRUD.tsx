import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const UserCRUD = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', password: '********' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: '********' },
  ]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success('User deleted successfully');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
      toast.success('User updated successfully');
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Menu
        </button>

        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-400 mr-4" />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                User Management
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-green-500/50"
              onClick={() => {
                setEditingUser({ id: users.length + 1, name: '', email: '', password: '' });
                setIsModalOpen(true);
              }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add User
            </motion.button>
          </div>

          <div className="grid gap-4">
            {users.map(user => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{user.name}</h3>
                    <p className="text-gray-400">{user.email}</p>
                    <p className="text-gray-500 text-sm">ID: {user.id}</p>
                  </div>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => handleEdit(user)}
                    >
                      <Pencil className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && editingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-800 rounded-lg p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">
                {editingUser.id ? 'Edit User' : 'Add User'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 rounded border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 text-base outline-none text-gray-100 py-2 px-4"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 rounded border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 text-base outline-none text-gray-100 py-2 px-4"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full bg-gray-700 rounded border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 text-base outline-none text-gray-100 py-2 px-4"
                    value={editingUser.password}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-400 hover:text-white"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingUser(null);
                    }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-purple-500/50"
                  >
                    Save
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserCRUD;