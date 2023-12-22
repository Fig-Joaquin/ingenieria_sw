// Asegúrate de exportar useFineId solo si no ha sido declarado antes
export const useFineId = () => {
  const context = useContext(FineIdContext);
  if (!context) {
    throw new Error('useFineId debe ser utilizado dentro de un FineIdProvider');
  }
  return context;
};