import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const GET_REVIEW = 'Spots/LOAD_REVIEW';
export const GET_USER_REVIEWS = 'Reviews/GET_USER_REVIEWS'
export const NEW_REVIEW = 'Spots/RECEIVE_REVIEW';
export const DELETE_REVIEW = 'Spots/REMOVE_REVIEW';
/**  Action Creators: */
//
export const getReview = (reviews) => ({
    type: GET_REVIEW,
    reviews
});
export const getUserReviews = (reviews) => ({
    type: GET_USER_REVIEWS,
    reviews
})
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
        const reviews = dispatch(getReview(data));
        // console.log('review in fetchReviewThunk', review)
        return reviews
    }
};
// GET All Users Reviews
export const fetchUserReviewsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current')
    console.log('response', response)
    if (response.ok) {
        const data = await response.json();
        console.log('data in fetchReviewThunk', data)
        const review = dispatch(getUserReviews(data));
        console.log('review in fetchReviewThunk', review)
        return review
    }
}
// // create a Review
export const createReviewThunk = (review, spotId) => async (dispatch) => {
    // console.log('spotId in CreateReviewThunk in ReviewReducer', spotId)
    // console.log('review in CreateReviewThunk in ReviewReducer', review)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });
    console.log('response in CreateReviewThunk in ReviewReducer', response)
    if (response.ok) {
        const data = await response.json();
        // console.log('data in CreateReviewThunk in ReviewReducer', data)
        const returnResponse = await dispatch(newReview(data));
        // console.log(' returnResponse in CreateReviewThunk in returnResponse', response)
        return returnResponse;
    }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    // console.log('reviewId in DeleteReviewThunk', reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    // console.log('response in DeleteReviewThunk', response)
    if (response.ok) {
        const data = await response.json();
        // console.log('data in Delete thunk')
        dispatch(deleteReview(reviewId))
    }
}

const initialState = {
    spot: {},
    userReviews: {}
}

const reviewsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_REVIEW:
            const newState = { spot: {} }
            // console.log('sdfsdsdfsd', newState)
            action.reviews.Reviews.forEach(review => {
                // console.log('review in reviewReducer', review)
                // console.log('newState in ReviewReducer', newState)
                newState.spot[review.id] = review
            });
            // console.log('newState in  reviewReducer', newState)
            return newState
        case GET_USER_REVIEWS:
            const userReviewState = { ...state, userReviews: { ...state.userReviews } }
            console.log('state', userReviewState)
            action.reviews.Reviews.forEach(review => {
                console.log("949494949", review)
                userReviewState.userReviews[review.id] = review
            })
            return userReviewState
        case NEW_REVIEW:
            const newNewState = { ...state, spot: { ...state.spot } }
            // console.log('Create A REVIEW STATE', newNewState)
            newNewState.spot[action.review.id] = action.review
            // console.log('Create A REVIEW STATE', newNewState)
            return newNewState
        case DELETE_REVIEW:
            const deleteState = { ...state, spot: { ...state.spot } }
            delete deleteState.spot[action.review]
            return deleteState
        default:
            return state;
    }
};

export default reviewsReducer;
