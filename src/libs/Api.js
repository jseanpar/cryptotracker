class Api {
    async getCatalogo() {
        const result = await fetch(`https://www.amiiboapi.com/api/amiibo/`, {
            method: 'GET', //metodo
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result.amiibo
    }
}

export default new Api()     