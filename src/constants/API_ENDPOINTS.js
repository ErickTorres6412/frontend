export const API_ENDPOINTS = {
  USUARIOS: {
    BASE: '/api/usuarios',
    GET_ALL: '/api/usuarios',
    GET_BY_ID: (id) => `/api/usuarios/${id}`,
    CREATE: '/api/usuarios',
    UPDATE: (id) => `/api/usuarios/${id}`,
    DELETE: (id) => `/api/usuarios/${id}`
  }
};
