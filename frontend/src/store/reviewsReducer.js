import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const GET_REVIEW = 'Spots/LOAD_REVIEW';
export const NEW_REVIEW = 'Spots/RECEIVE_REVIEW';
export const DELETE_REVIEW = 'Spots/REMOVE_REVIEW';
/**  Action Creators: */
//
export const getReview = (reviews) => ({
    type: GET_REVIEW,
    reviews
});
export const newReview = (review) => ({
    type: NEW_REVIEW,
    review,
});
export const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
})
/** Thunk Action Creators: */
// get all Review // should be good
export const fetchReviewThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        const review = dispatch(getReview(data));
        return review
    }
};
// // create a Review
export const createReviewThunk = (spotId, review, user) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });
    if (response.ok) {
        const data = await response.json();
        data.User = user
        dispatch(newReview(data));
        return data;
    }
};

export const deleteReviewThunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const data = await response.json();
        console.log('data in Delete thunk')
        dispatch(deleteReview(review.id))
    }
}

const initialState = {
    spot: {}
}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEW:
            newState = { ...state, spot: { ...state.spot } }
            action.reviews.Review.forEach(review => {
                newState.spot[action.review.id] = review
            });
            return newState
        case NEW_REVIEW:
            newState = { ...state, spot: { ...state.spot } }
            newState.spot[action.review.id] = action.review
            return newReview
        case DELETE_REVIEW:
            const deleteState = { ...state }
            delete deleteReviewThunk.spot[action.review]
        default:
            return state;
    }
};

export default reviewsReducer;
