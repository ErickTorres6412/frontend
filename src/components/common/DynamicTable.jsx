import React, { useState } from 'react';
import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const DynamicTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  itemsPerPage = 10 
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Funciones de navegación
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Encabezados */}
          <thead className="bg-emerald-50 border-b border-emerald-100">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-4 py-3 text-left text-xs font-medium text-emerald-600 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-medium text-emerald-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody className="divide-y divide-gray-200">
            {currentData.map((item, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-emerald-50 transition-colors"
              >
                {Object.values(item).map((value, colIndex) => (
                  <td 
                    key={colIndex} 
                    className="px-4 py-3 text-sm text-gray-700"
                  >
                    {value}
                  </td>
                ))}
                
                {/* Columna de acciones */}
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-emerald-500 hover:text-emerald-700 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Sin datos */}
        {data.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No hay datos disponibles
          </div>
        )}
      </div>

      {/* Paginación */}
      {data.length > itemsPerPage && (
        <div className="flex justify-between items-center p-4 bg-emerald-50 border-t border-emerald-100">
          <span className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-white border border-emerald-200 text-emerald-600 p-2 rounded-md 
                         disabled:opacity-50 disabled:cursor-not-allowed 
                         hover:bg-emerald-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="bg-white border border-emerald-200 text-emerald-600 p-2 rounded-md 
                         disabled:opacity-50 disabled:cursor-not-allowed 
                         hover:bg-emerald-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;