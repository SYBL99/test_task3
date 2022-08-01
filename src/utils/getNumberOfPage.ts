function getArrayOfPageNumber (number: number) {
    const buffer = []
    for (let i = 1; i< number+1; i++){
        buffer.push(i)
    }
    return buffer
}

export default getArrayOfPageNumber;