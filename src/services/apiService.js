import { createGenericService } from '../services/createGenericService';
import { API_ENDPOINTS } from '../constants/API_ENDPOINTS';

export const usuarioService = createGenericService(API_ENDPOINTS.USUARIOS.BASE);