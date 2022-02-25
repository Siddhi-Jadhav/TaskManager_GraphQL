import { gql } from '@apollo/client'
import axios from 'axios'
import { print } from 'graphql'
import { settings } from '../config'

export const signup = async (username, password) => {
  const response = await axios({
    method: 'POST',
      url: settings.server,
      headers: {
        Authorization: `none`,
      },
        data: {
          query: print(gql`
          mutation signup($username: String!, $password: String!){
            signup(input:{username:$username, password:$password})
            { 

              id
              username
            }
          }

        `),
        variables: {
          username: username,
          password: password,
        },
      },
  })
  console.log(response)
  return response.data
}

export const signin = async (username, password) => {
  const response = await axios({
    method: 'POST',
      url: settings.server,
        data: {
          query: print(gql`
          mutation signin($username: String!, $password: String!) {
            signin(input:{username:$username, password:$password}) {
              token
            }
          }
        `),
        variables: {
          username: username,
          password: password,
        },
      },
  })
  console.log(response)
  return response.data
}
