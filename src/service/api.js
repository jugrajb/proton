import axios from 'axios';

const BE_URL = "http://localhost:8080/app/"

export async function post(dest, data, urlParams = "") {
  console.log(data)
  try {
    const response = await axios.post(
      BE_URL + dest + urlParams, 
      { ...data}
    )

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function get(dest, urlParams = "") {
  try {
    const response = await axios.get(
      BE_URL + dest + urlParams
    )
    return response
  } catch (error) {
    console.log(error)
  }
}


export async function put(dest, data, config) {
  try {
    const response = await axios.post(
      BE_URL + dest, 
      { params: config },
      { ...data }
    )
    return response
  } catch (error) {
    console.log(error)
  }
}


export async function del(dest, config) {
  try {
    const response = await axios.post(
      BE_URL + dest, 
      { params: config }
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

