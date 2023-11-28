import isAuthenticated from "../isAuthenticated"

const query = async (url, method, body) => {
  const token = isAuthenticated() ? JSON.parse(localStorage.getItem('currentUser')).token : ''
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
  const options = {
    method,
    headers,
    body
  }
  // const urlApiTest = '/api'
  const urlApiTest = 'http://127.0.0.1:5000/api'
  // const urlApiTest = 'http://blog-app-backend-service/api'

  try {
    const res = await fetch(urlApiTest + url, options)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}


// Posts
export const getAllPosts = async () => await query('/posts', 'GET', null)
export const getFilteredPosts = async (filter) => await query('/posts?' + filter, 'GET', null)
export const getFeaturedPosts = async () => await query('/posts?featured=true&limit=3', 'GET', null)
export const getPostById = async (postId) => await query(`/posts/${postId}`, 'GET', null)
export const createNewPost = async (postData) => await query('/posts/', 'POST', JSON.stringify(postData))
export const updatePostById = async (postId, postData) => await query(`/posts/${postId}`, 'PUT', JSON.stringify(postData))
export const deletePostById = async (postId) => await query(`/posts/${postId}`, 'DELETE', null)
export const likePostById = async (postId) => await query(`/posts/like/${postId}`, 'POST', null)
export const unlikePostById = async (postId) => await query(`/posts/unlike/${postId}`, 'POST', null)

// Users
export const getUserById = async (userId) => await query(`/users/${userId}`, 'GET', null)
export const registerUser = async (userData) => await query('/users/register', 'POST', JSON.stringify(userData))
export const loginUser = async (loginData) => await query('/users/login', 'POST', JSON.stringify(loginData))
export const updateUserPassword = async (passwordData) => await query('/users/change-password', 'PUT', JSON.stringify(passwordData))
export const updateUserProfile = async (profileData) => await query('/users/update-info', 'PUT', JSON.stringify(profileData))
export const updateUserListFields = async (fieldName, operationType, itemIds) => await query('/users/update-list-fields', 'PUT', JSON.stringify({ fieldName, operationType, itemIds }))
export const getAllUsers = async (token) => await query('/users', 'GET', null)
export const getFeaturedUsers = async () => await query('/users/all/featured?limit=3', 'GET', null)
export const updateRoleById = async (userId, role) => await query(`/users/${role}/${userId}`, 'PUT', null)

// Tags and Categories
export const getAllCategories = async () => await query('/categories?limit=50', 'GET', null)
export const getCategoryById = async (categoryId) => await query(`/categories/${categoryId}`, 'GET', null)
export const createCategory = async (categoryData) => await query('/categories', 'POST', JSON.stringify(categoryData))
export const deleteCategoryById = async (categoryId) => await query(`/categories/${categoryId}`, 'DELETE', null)
export const updateCategoryNameById = async (categoryId, newName) => await query(`/categories/${categoryId}`, 'PUT', JSON.stringify({ newName }))

export const getAllTags = async () => await query('/tags?limit=50', 'GET', null)
export const getTenTags = async () => await query('/tags?limit=10', 'GET', null)
export const getTagById = async (tagId) => await query(`/tags/${tagId}`, 'GET', null)
export const createTag = async (tagData) => await query('/tags', 'POST', JSON.stringify(tagData))
export const deleteTagById = async (tagId) => await query(`/tags/${tagId}`, 'DELETE', null)
export const updateTagNameById = async (tagId, newName) => await query(`/tags/${tagId}`, 'PUT', JSON.stringify({ newName }))


// Comments
export const getCommentById = async (commentId) => await query(`/comments/${commentId}`, 'GET', null);
export const getAllCommentsOfPost = async (postId) => await query(`/comments/all/${postId}?limit=100`, 'GET', null);
export const createComment = async (commentData) => await query('/comments', 'POST', JSON.stringify(commentData));
export const deleteCommentById = async (commentId) => await query(`/comments/${commentId}`, 'DELETE', null);
export const updateCommentById = async (commentId, commentData) => await query(`/comments/${commentId}`, 'PUT', JSON.stringify(commentData));
export const likeCommentById = async (commentId) => await query(`/comments/like/${commentId}`, 'POST', null);
export const unlikeCommentById = async (commentId) => await query(`/comments/unlike/${commentId}`, 'POST', null);
