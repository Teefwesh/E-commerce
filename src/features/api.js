export const url = "https://e-commerce-tegs.herokuapp.com/api";
// export const url = "http://localhost:5000/api";  for production

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
