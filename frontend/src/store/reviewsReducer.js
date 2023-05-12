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
        console.log("newReview in review Thunk")
        dispatch(receiveReview(newReview));
        return newReview;
    } else {
        try {
            await res.json();
        } catch (error) {
            console.log('err in thunk', error)
            return error;
        }
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    console.log('reviewId in Thunk ', reviewId)
    console.log('reviewId.reviewId in Thunk ', reviewId.reviewId)
    const res = await csrfFetch(`/api/reviews/${reviewId.reviewId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        const message = await res.json();
        console.log("response message in ReviewReducer", message)
        await dispatch(removeReview(reviewId))
    }
}

const initialState = {
    spot: {},
    user: {}
}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEW:
            let newState = { ...state, spot: { ...state.spot } }
            // console.log('newState in Reducer',newState)
            action.reviews.Reviews.forEach(review => newState.spot[review.id] = review)
            return newState
        case RECEIVE_REVIEW:
            let createState = { ...state, spot: { ...state.spot } }
            createState.spot[action.review.id] = action.review
        case REMOVE_REVIEW:
            const deleteState = { ...state }
            delete deleteState[action.reviewIds]
        default:
            return state;
    }
};

export default reviewsReducer;
