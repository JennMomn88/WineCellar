import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

const profile = async () => {
  try {
    const response = await http.get('/users/me');
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al cargar el perfil del usuario'
    );
  }
};

const getWineById = async (wineId) => {
  try {
    const response = await http.get(`/wines/${wineId}`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al obtener el vino por ID'
    );
  }
};

const searchWines = async (query) => {
  try {
    const response = await http.get(`/wines/?name=${query}`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al buscar vinos');
  }
};

const searchWinesByType = async (wineType) => {
  try {
    const response = await http.get(`/wines?type=${wineType}`);

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al buscar vinos');
  }
};

const register = (user) => http.post('/users', user);

const login = (user) => http.post('/sessions', user);

const logout = () => http.delete('/sessions');

const updateUser = (user) => http.patch('/users/me', user);

const getCellar = () => http.get('/cellar/me');

const getLatestWines = () => http.get('/wines?limit=2&sort=updatedAt');

const getLatestComments = () => http.get('comments?limit=3&sort=updatedAt');

const getComments = () => http.get('/comments?sort=updatedAt');

const getUserComments = (userId) =>
  http.get('/comments?sort=updatedAt&user=' + userId);

const postComment = (comment) =>
  http.post('/comments', {
    text: comment.message,
    isPublic: true,
    parentComment: null,
    wineId: comment.wineId,
  });

const isWineInCellar = async (wineId) => {
  try {
    const cellarData = await getCellar();
    return cellarData.wines.some((wine) => wine.id === wineId);
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Error al verificar si el vino está en la bodega'
    );
  }
};

const getWines = () => http.get('/wines');

const addWineToCellar = (wineId) =>
  http.post('/cellar/wine', { wineId: wineId });

const removeWineFromCellar = (wineId, reason) =>
  http.patch('/cellar/wine/' + wineId, { reason: reason });

export {
  register,
  profile,
  login,
  getCellar,
  logout,
  getLatestWines,
  getLatestComments,
  updateUser,
  searchWines,
  getWines,
  addWineToCellar,
  getComments,
  postComment,
  isWineInCellar,
  searchWinesByType,
  getWineById,
  getUserComments,
  removeWineFromCellar,
};
