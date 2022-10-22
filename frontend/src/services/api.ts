const api = {
    getUser: async (id:string) => await get(`/users/${id}`),
    postOrder: async (body:any) => await send(`/orders`, body, 'POST' ),
    getProducts: async () => await get(`/products`)
}

//TODO: setup with environment variables
const baseUrl = 'http://localhost:4000/api'

async function get(url: string) {
    const fullUrl = `${baseUrl}${url}` 
    const response = await fetch(fullUrl);
    if(response.ok) {
        const json = await response.json()
        return json;
    }else {
        throw Error(`Failed to fetch: ${fullUrl}`)
    }
}

async function send(url: string, body: any, method:string) {
    const fullUrl = `${baseUrl}${url}` 
    const response = await fetch(fullUrl, { 
        method: method, 
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify(body)
    });
    if(response.ok) {
        const json = await response.json()
        return json;
    }else {
        throw Error(`Failed to fetch: ${fullUrl}`)
    }
}


export default api;