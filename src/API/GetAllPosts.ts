import { APIResponseTypes } from "../interfaces/APITypes"

async function getAllPosts () {
    const repsponse = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data: APIResponseTypes[] = await repsponse.json()
    return data
}

export default getAllPosts