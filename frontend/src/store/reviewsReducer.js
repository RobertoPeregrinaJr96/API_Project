import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_REVIEW = 'Spots/LOAD_REVIEW';
export const RECEIVE_REVIEW = 'Spots/RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'Spots/REMOVE_REVIEW';

/**  Action Creators: */

//
export const loadReview = (reviews) => ({
    type: LOAD_REVIEW,
    reviews
});

export const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review,
});

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

/** Thunk Action Creators: */
// get all Review // should be good
export const fetchReviewThunk = (spotId) => async (dispatch) => {
    // console.log('spot id on thunk', spotId)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    // console.log('Response on thunk', res)
    if (res.ok) {
        // const user = await csrfFetch(`/api/spots/${res.userId}`)
        // console.log('User in thunk', user)
        const reviews = await res.json();
        // console.log('reviews on thunk ==>', reviews)
        const review = dispatch(loadReview(reviews));
        // console.log('review on Thunk ===> ', review)
        return review
    }
};

// // create a Review
export const createReview = (spotId, review) => async (dispatch) => {
    // console.log('spotId in thunk', spotId)
    // console.log('review in thunk', review)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });
    // console.log("response in Review Thunk", res)
    if (res.ok) {
        const newReview = await res.json();
        // console.log("newReview in review Thunk")
        dispatch(receiveReview(newReview));
        return newReview;
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    console.log('reviewId in Thunk ', reviewId)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    console.log('Response in thunk')
    if (res.ok) {
        const message = await res.json();
        console.log("response message in ReviewReducer", message)
        dispatch(removeReview(reviewId))
    }
}

const initialState = {
    spot: {},
    user: {}
}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEW:
            newState = { ...state, spot: { ...state.spot } }
            action.reviews.Reviews.forEach(review => newState.spot[review.id] = review)
            return newState
        case RECEIVE_REVIEW:
            newState = { ...state, spot: { ...state.spot } }
            newState.spot[action.review.id] = action.review
        case REMOVE_REVIEW:
            newState = { ...state, spot: { ...state.spot } }
            delete newState.spot[action.reviewId]
        default:
            return state;
    }
};

export default reviewsReducer;
