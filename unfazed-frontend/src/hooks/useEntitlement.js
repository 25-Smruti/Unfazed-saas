export const useEntitlement = () => {
  // Always return true so all features (Analytics, SOAP Notes, etc.) are unlocked in your browser
  const checkEntitlement = () => true;

  return { checkEntitlement };
};