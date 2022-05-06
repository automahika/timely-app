const getFormData = (fields, authorization, headers) => {
    const formData = new FormData()

    // Loop all fields and use append to the form data
    for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value)
    }

    return formData
}

export { getFormData }
