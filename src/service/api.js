import axios from 'axios';

const BE_URL = "http://localhost:8080/app/"

export const getURL = () => BE_URL;

export async function post(url_data, data) {
  console.log(url_data)
  try {
    const response = await axios.post(
      BE_URL + url_data, 
      { ...data}
    )

    return response
  } catch (error) {
    console.log("post: ", error)
  }
}

export async function get(url_data) {
  try {
    const response = await axios.get(
      BE_URL + url_data
    )
    return response
  } catch (error) {
    console.log("get: ", error)
  }
}


export async function put(url_data, data) {
  try {
    const response = await axios.put(
      BE_URL + url_data,
      { ...data }
    )
    return response
  } catch (error) {
    console.log("put: ", error)
  }
}


export async function del(url_data) {
  try {
    const response = await axios.delete(
      BE_URL + url_data
    )
    return response
  } catch (error) {
    console.log("delete: ", error)
  }
}

export async function deleteID(dest, urlParams = "") {
  try {
    const response = await axios.delete(
      BE_URL + dest + urlParams
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
