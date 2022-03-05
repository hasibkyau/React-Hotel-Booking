import * as actionTypes from './actionTypes';
import axios from 'axios';
import { baseUrl } from './baseUrl';

export const addComment = (hotelId, rating, author, comment) => dispatch => {
    const newComment = {
        hotelId: hotelId,
        author: author,
        rating: rating,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    
    axios.post(baseUrl + "comments", newComment)
    .then(response => response.data)
    .then(comment => dispatch(commentConcat(comment)))
}

const commentConcat = (comment) => ({
    type: actionTypes.ADD_COMMENT,
    payload: comment
})

const commentLoading = () =>({
    type: actionTypes.COMMENT_LOADING
})

const loadComments = comments => ({
    type: actionTypes.LOAD_COMMENTS,
    payload: comments
})

export const fetchComments = () => dispatch => {
    // dispatch(commentLoading());
    // axios.get(baseUrl + 'comments')
    // .then(response => response.data)
    // .then(comments => dispatch(loadComments(comments)));
}


const loadHotels = hotels => ({
    type: actionTypes.LOAD_HOTELS,
    payload: hotels
})

const hotelsLoading = () => ({
    type: actionTypes.HOTELS_LOADING,
})

const hotelsFailed = (errMess) => ({
    type: actionTypes.HOTELS_FAILED,
    payload: errMess
})

export const fetchHotels = () => dispatch => {
        dispatch(hotelsLoading());

        axios.get("https://react-hotel-booking-8a9d3-default-rtdb.firebaseio.com/hotels.json")
        .then(response => response.data)
        .then(hotels => dispatch(loadHotels(hotels)))
        .catch(error => dispatch(hotelsFailed(error.message)))
}




const feedbackLoading = () =>({
    type: actionTypes.FEEDBACK_LOADING
})


const loadFeedback = feedback => ({
    type: actionTypes.LOAD_FEEDBACK,
    payload: feedback,
})


export const fetchFeedback = () => dispatch => {
    dispatch(feedbackLoading());
    axios.get(baseUrl + 'feedback')
    .then(response =>dispatch(loadFeedback(response.data)))
    .then(feedback => console.log());
}