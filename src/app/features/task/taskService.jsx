import axios from 'axios'
const API_URL = 'https://taskapplibackend-0x9ddauj.b4a.run/v1/tache/'

const creatTask = async (taskData, token) => {
      const config = {
           headers: {
           Authorization: `Bearer ${token}`,
}}
      const response = await axios.post(API_URL, taskData, config)
      return response.data
}

const getTasks = async token => {
      const config = {
            headers: {
            Authorization: `Bearer ${token}`,
}
}
      const response = await axios.get(API_URL, config)
      return response.data
}

const deleteTask = async (id, token) => {
     const config = {
           headers: {
           Authorization: `Bearer ${token}`,
}
}
      const response = await axios.delete(API_URL + id, config)
      return response.data
}

const taskService = { creatTask, getTasks, deleteTask }
export default taskService
