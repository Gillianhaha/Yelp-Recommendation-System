import axios from "axios";

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getRecommendation = (external_customer_id) => {
  console.log("Querying for " + external_customer_id);
  return axios.get(`http://127.0.0.1:5000/get_recommendation?external_customer_id=${external_customer_id}`);
};
