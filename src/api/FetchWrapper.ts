type bodyData = string | FormData | null

const env = import.meta.env
const API = env.VITE_API_URL

class FetchWrapper {
    private baseURL: string;

    constructor(baseURL: string = API) {
        this.baseURL = baseURL;
    }

    async request<T>(endpoint: string, method: string, data: bodyData = null, headers = {}): Promise<T>  {
        const url = `${this.baseURL}${endpoint}`;
        let options = {
            method,
            headers: {
                'Accept': 'application/json',
                ...headers
            }
        };

        if(data) {
            options =  Object.assign(options, {body: data}) 
            console.log('options', options)
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'An error occurred');
            }
            return result.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    get<T>(endpoint: string, headers = {}): Promise<T>{
        return this.request(endpoint, 'GET', null, headers);
    }

    post<T>(endpoint: string, data: FormData, headers = {}) : Promise<T>{
        return this.request(endpoint, 'POST', data, headers);
    }

    put<T>(endpoint: string, data: object, headers = {}) : Promise<T>{
        const putData = JSON.stringify(data);
        return this.request(endpoint, 'PUT', putData, headers);
    }

    delete<T>(endpoint: string, headers = {}): Promise<T> {
        return this.request(endpoint, 'DELETE', null, headers);
    }
}

export default FetchWrapper
// // Usage Example
// const api = new FetchWrapper('https://api.example.com');

// // GET request
// api.get('/endpoint')
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

// // POST request
// api.post('/endpoint', { key: 'value' })
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

// // PUT request
// api.put('/endpoint', { key: 'value' })
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

// // DELETE request
// api.delete('/endpoint')
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
