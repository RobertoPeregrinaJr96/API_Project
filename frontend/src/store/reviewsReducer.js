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
    // console.log('spotId in fetchReviewThunk', spotId)
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    // console.log('response in fetchReviewThunk', response)
    if (response.ok) {
        const data = await response.json();
        // console.log('data in fetchReviewThunk', data)
        const review = dispatch(getReview(data));
        // console.log('review in fetchReviewThunk', review)
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

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    console.log('reviewId in DeleteReviewThunk', reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    console.log('response in DeleteReviewThunk', response)
    if (response.ok) {
        const data = await response.json();
        // console.log('data in Delete thunk')
        dispatch(deleteReview(reviewId))
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
            action.reviews.Reviews.forEach(review => {
                // console.log('review in reviewReducer', review)
                // console.log('newState in ReviewReducer',newState)
                newState.spot[review.id] = review
            });
            // console.log('newState in  reviewReducer', newState)
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
