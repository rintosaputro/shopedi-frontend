import http from "../../helper/http";

export const getProfile = async (dispatch) => {
  dispatch({
    type: 'TOGGLE_LOADING'
  })
  const token = window.localStorage.getItem('token')
  const { data } = await http(token).get('http://localhost:5000/users/profile')
  dispatch({
    type: 'GET_PROFILE',
    payload: data.results
  })
  dispatch({
    type: 'TOGGLE_LOADING'
  })
}

export const editProfile = (name, gender, images) => {
  console.log(gender)
  return async (dispatch) => {
    try {
      dispatch({
        type: 'TOGGLE_LOADING'
      })
      const token = window.localStorage.getItem('token')
      const param = new FormData()

      // param.append('email', email)
      param.append('gender', gender)
      param.append('name', name)
      param.append('description', description)
      param.append('image', images)
      const { data } = await http(token, true).patch('http://localhost:3000/users/profile', param)
      dispatch({
        type: 'EDIT_PROFILE',
        payload: data.results
      })
      dispatch({
        type: 'TOGGLE_LOADING'
      })
    } catch (err) {
      dispatch({
        type: 'USER_ERROR',
        payload: err.response.data
      })
      dispatch({
        type: 'TOGGLE_LOADING'
      })
    }
  }
}

