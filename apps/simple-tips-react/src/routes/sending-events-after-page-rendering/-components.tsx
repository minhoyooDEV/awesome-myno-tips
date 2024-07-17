import axios from "axios";
axios.interceptors.response.use((response) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 1500);
  });
});
// setted response deplayed to 2 seconds
export const fetchPosts = async (params: { postId: number }) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`,
    {}
  );
  return response.data;
};
