import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_REVIEW = 'Spots/LOAD_REVIEW';
export const RECEIVE_REVIEW = 'Spots/RECEIVE_REVIEW';
export const UPDATE_REVIEW = 'Spots/UPDATE_REVIEW';
export const REMOVE_REVIEW = 'Spots/REMOVE_REVIEW';
export const SINGLE_LOAD_REVIEW = 'Spots/SINGLE_LOAD_REVIEW'
/**  Action Creators: */
export const loadReview = (reviews) => ({
    type: LOAD_REVIEW,
    reviews
});

export const singleReview = (review) => ({
    type: SINGLE_LOAD_REVIEW,
    review
})

export const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review,
});

export const editReview = (review) => ({
    type: UPDATE_REVIEW,
    review,
});

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId,
});

/** Thunk Action Creators: */
// get all Review // should be good
export const fetchReviewThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/reviews');
    if (res.ok) {
        // console.log('reviews ==>',reviews)
        const reviews = await res.json();
        dispatch(loadReview(reviews));
    }
};
// get Review by Id
export const fetchDetailedReviewThunk = (reviewId) => async (dispatch) => {
    // console.log(spotId)
    const response = await csrfFetch(`/api/spots/${reviewId}`)
    // console.log('response ===> ',response)
    if (response.ok) {
        const review = await response.json()
        // console.log('spot ===>',spot);
        dispatch(singleReview(review))
    }
};
// delete a Review
export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spot/${reviewId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(removeReview(reviewId));
    } else {
        const errors = await res.json();
        return errors;
    }
};
// create a Review
export const createReview = (review) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });

    if (res.ok) {
        const newReview = await res.json();
        dispatch(receiveReview(review));
        return newReview;
    } else {
        const errors = await res.json();
        return errors;
    }
};
// delete a Review
export const updateReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });

    if (res.ok) {
        const updatedReview = await res.json();
        dispatch(editReview(updatedReview));
        return updatedReview;
    } else {
        const errors = await res.json();
        return errors;
    }
};

const initialState = {
    spot: { user: {}, ReviewImages: [] },
    user: { reviewId: { user: {}, spot: {}, ReviewImages: [] } }
}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEW:
            let newState = { ...state }

            return newState
        default:
            return state;
    }
};

export default reviewsReducer;
