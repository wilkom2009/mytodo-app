import axios from 'axios'
import { API_URL } from '../../Constants.js'

class HelloWorldService {
    executeHelloWorldService() {
        console.log("Execuste hello");
        return axios.get(`${API_URL}/hello-world-bean`);
    }
    executeHelloWorldPathvairableService(name) {
       // let username = 'user'
        // let password = 'password'

        // let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)

        return axios.get(`${API_URL}/hello-world-bean/path-variable/${name}`
            // {
            //     headers: {
            //        authorization: basicAuthHeader
            //     }
            // }
        );
    }

}

export default new HelloWorldService()