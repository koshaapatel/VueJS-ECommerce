// To communicate with the server(node)
import axios from 'axios';

export default ()=> {
    return axios.create({
        //backend URL(Node.js)
        baseURL: 'http://localhost:3000/'
    })
};
