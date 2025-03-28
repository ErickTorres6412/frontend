import React, { useState } from 'react';
import DynamicTable from '../../components/common/DynamicTable';
import { useCRUD } from '../../hooks/useCRUD';
import { usuarioService } from '../../services/apiService';
import { Plus } from 'lucide-react';

const Users = () => {
  // Definir las columnas de la tabla
  const columns = ['ID', 'Nombre', 'Email', 'Rol'];

  // Usar el hook CRUD con el servicio de usuarios
  const { 
    data: usuarios, 
    loading, 
    create, 
    update, 
    remove 
  } = useCRUD(usuarioService);

  // Estados para el formulario modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Preparar datos para la tabla
  const tableData = usuarios.map(usuario => ({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol
  }));

  // Manejadores de acciones
  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (user) => {
    await remove(user.id);
  };

  const handleCreate = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  // Renderizado condicional de carga
  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-emerald-700">Gestión de Usuarios</h1>
        <button 
          onClick={handleCreate}
          className="flex items-center bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Nuevo Usuario
        </button>
      </div>

      <DynamicTable 
        columns={columns}
        data={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Aquí irías agregando el modal para crear/editar usuarios */}
      {isModalOpen && (
        <div>
          {/* Modal de creación/edición de usuarios */}
        </div>
      )}
    </div>
  );
};

export default Users;