class StickersApi {
    static URL = 'https://62e3ccc8b54fc209b8912174.mockapi.io/api/stickers/';
    
    static request(id, method, element) {
        return fetch(this.URL + id, {
            method,
            body: JSON.stringify(element),
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error();
            })
    }
    
    static textChange(id, description) {
        return fetch(this.URL + id, {
            method: 'PUT',
            body: JSON.stringify({ description }),
            headers: {
                'Content-type': 'application/json',
        }
    });
    }

    static remove(id) {
        return fetch(this.URL + id, {
            method: 'DELETE',
    });
    }
}

export default StickersApi;
