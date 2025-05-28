export const environment = {
  production: false,
  /**
   * Aquí puedes usar la misma ruta relativa ‘/api’ porque
   * cuando levantas con `ng serve --proxy-config …`
   * el proxy redirige automáticamente.
   */
  apiUrl: 'http://localhost:8000',
  // apiUrl: '/api',
};
