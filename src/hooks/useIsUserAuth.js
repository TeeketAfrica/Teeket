const useIsUserAuth = () => {
  const token = sessionStorage.getItem("TOKEN") || "";
  return token;
};

export default useIsUserAuth;
