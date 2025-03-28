import React, { useState } from 'react';
import { ChevronRight, LayoutDashboard } from 'lucide-react';
import modules from '../../config/modules';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [expandedModule, setExpandedModule] = useState(null);
  const [isCompact, setIsCompact] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 z-20 h-full pt-2 transition-transform duration-300 ease-in-out bg-white shadow-lg border-r border-emerald-100
        ${isCompact ? 'w-20' : 'w-64'}`}
    >
      {/* Franja decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
  
      <div className="h-full overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
        {/* Botón de Dashboard */}
        <Link
          to="/dashboard"
          className={`w-full flex items-center ${isCompact ? 'justify-center' : 'gap-3 px-4'} py-4 transition-all duration-200 
            ${location.pathname === '/dashboard' 
              ? 'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700' 
              : 'border-l-4 border-transparent hover:bg-gray-50 text-gray-700 hover:text-emerald-600'}`}
        >
          <LayoutDashboard size={20} className={location.pathname === '/dashboard' ? "text-emerald-600" : "text-gray-500"} />
          {!isCompact && <span className="text-sm font-medium">Panel Principal</span>}
        </Link>
  
        {/* Separador */}
        {!isCompact && (
          <div className="px-4 py-3 mt-1">
            <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Gestión</h2>
            <div className="h-px bg-gradient-to-r from-emerald-100 to-transparent mt-2"></div>
          </div>
        )}
  
        {/* Módulos */}
        {modules.map((module, index) => (
          <div key={index} className="mb-1">
            <button
              onClick={() => {
                if (!isCompact) {
                  setExpandedModule(expandedModule === index ? null : index);
                }
              }}
              className={`w-full flex items-center ${isCompact ? 'justify-center' : 'justify-between px-4'} py-3 transition-all duration-200 
                ${expandedModule === index 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'hover:bg-gray-50 text-gray-700 hover:text-emerald-600'} 
                ${isCompact ? '' : 'border-l-4'} 
                ${expandedModule === index && !isCompact ? 'border-emerald-500' : 'border-transparent'}`}
            >
              <div className={`flex items-center ${isCompact ? '' : 'gap-3'}`}>
                <module.icon 
                  size={20} 
                  className={expandedModule === index ? "text-emerald-600" : "text-gray-500"} 
                />
                {!isCompact && <span className="text-sm font-medium">{module.title}</span>}
              </div>
              {!isCompact && (
                <ChevronRight
                  size={16}
                  className={`transform transition-transform duration-200 
                    ${expandedModule === index ? 'rotate-90 text-emerald-600' : 'text-gray-400'}`}
                />
              )}
            </button>
            
            {/* Subitems */}
            {!isCompact && (
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden
                  ${expandedModule === index ? 'max-h-60' : 'max-h-0'}`}
              >
                {module.subItems.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.link}
                    className={`block pl-12 pr-4 py-2.5 text-sm transition-colors
                      ${location.pathname === item.link 
                        ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-500' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-emerald-600'}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Botón para contraer/expandir sidebar */}
        <button 
          onClick={() => setIsCompact(!isCompact)}
          className="w-full flex items-center justify-center py-3 mt-4 border-t border-gray-200 hover:bg-gray-50"
        >
          <ChevronRight 
            size={20} 
            className={`transform transition-transform duration-300 ${isCompact ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>
  
      {/* Efecto de sombra para indicar scroll */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      
      {/* Elemento decorativo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-100 to-teal-100"></div>
    </aside>
  );
};

export default Sidebar;