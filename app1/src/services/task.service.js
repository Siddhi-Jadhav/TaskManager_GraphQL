import { gql } from '@apollo/client'
import axios from 'axios'
import { print } from 'graphql'
import { settings } from '../config'

export const getTasks = async (status = '') => {
  const token = sessionStorage['token']
  const response = await axios({
    method: 'POST',
    url: settings.server,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: print(gql`
      query getTasks($status: String!) {
          getTasks(status: $status) {
            id
            title
            description
            status
          }
        }
      `),
      variables: {
        status,
      },
    },
  })

  return response.data
}


export const createTask = async (title, description) => {
  const token = sessionStorage['token']
  const response = await axios({
    method: 'POST',
    url: settings.server,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: print(gql`
        mutation createTask($title: String!, $description: String!) {
          createTask(input: { title: $title, description: $description }) {
            id
            title
          }
        }
      `),
      variables: {
        title,
        description,
      },
    },
  })

  return response.data
}

export const changeTaskStatus = async (id, status) => {
  const token = sessionStorage['token']
  const response = await axios({
    method: 'POST',
    url: settings.server,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: print(gql`
        mutation updateTaskStatus($id: Float!, $status: String!) {
          updateTaskStatus(id: $id, status: $status) {
            id
            title
          }
        }
      `),
      variables: {
        id: Number(id),
        status,
      },
    },
  })

  return response.data
}
