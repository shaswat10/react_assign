import axios from 'axios';

const apicallFun = (urlData, reqData=null) => {
  axios.get(urlData, reqData).then((res) => {
    return res;
  });
};
export default apicallFun