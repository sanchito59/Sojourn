import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, DELETE_POST, POST_ERROR, UPDATE_LIKES } from './types';

// GET ALL POSTS
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({ type: GET_POSTS, payload: res.data })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// DELETE A POST
export const deletePost = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);

    dispatch({ type: DELETE_POST, payload: id });

    dispatch(setAlert('Post deleted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// LIKE A POST
export const addLike = (postId) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// UNLIKE A POST
export const removeLike = (postId) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

