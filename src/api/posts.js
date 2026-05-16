const BASE_URL = import.meta.env.VITE_API_URL

const getToken = () => localStorage.getItem('token')

export const getPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`)
  return res.json()
}

export const createPost = async (text, image) => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ text, image })
  })
  return res.json()
}

export const deletePost = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  return res.json()
}

export const likePost = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}/like`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  return res.json()
}

export const unlikePost = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}/unlike`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  return res.json()
}

export const getComments = async (post_id) => {
  const res = await fetch(`${BASE_URL}/comments/${post_id}`)
  return res.json()
}

export const addComment = async (post_id, text) => {
  const res = await fetch(`${BASE_URL}/comments/${post_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ text })
  })
  return res.json()
}

export const addReply = async (comment_id, text) => {
  const res = await fetch(`${BASE_URL}/comments/reply/${comment_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ text })
  })
  return res.json()
}

export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    body: formData
  })
  return res.json()
}