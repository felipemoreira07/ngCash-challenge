const useToken = () => {
  const token = () => {
    const token = JSON.parse(localStorage.getItem("@auth") || "");

    if (token) {
      return token;
    } else {
      return { access_token: null };
    }
  };
  return token();
};

export default useToken;
