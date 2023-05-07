import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_SPOTS = 'Spots/LOAD_SPOTS';
export const RECEIVE_SPOTS = 'Spots/RECEIVE_SPOTS';
export const UPDATE_SPOTS = 'Spots/UPDATE_SPOTS';
export const REMOVE_SPOTS = 'Spots/REMOVE_SPOTS';

/**  Action Creators: */
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOTS,
    spot,
});

export const editSpot = (spot) => ({
    type: UPDATE_SPOTS,
    spot,
});

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOTS,
    spotId,
});

/** Thunk Action Creators: */
// get all spots
export const fetchSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    // console.log("Response at Thunk: ", res)
    if (res.ok) {
        const spots = await res.json();
        // console.log("Spots at Thunk: ", spots)
        dispatch(loadSpots(spots));

    }
};
// get spot by Id
export const fetchDetailedSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if (res.ok) {
        const spotDetails = await res.json();
        dispatch(receiveSpot(spotDetails));
    } else {
        const errors = await res.json();
        return errors;
    }
};
// delete a spot
export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spot/${spotId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(removeSpot(spotId));
    } else {
        const errors = await res.json();
        return errors;
    }
};
// create a spot
export const createSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });

    if (res.ok) {
        const newReport = await res.json();
        dispatch(receiveSpot(spot));
        return newReport;
    } else {
        const errors = await res.json();
        return errors;
    }
};
// delete a spot
export const updateSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });

    if (res.ok) {
        const updatedSpot = await res.json();
        dispatch(editSpot(updatedSpot));
        return updatedSpot;
    } else {
        const errors = await res.json();
        return errors;
    }
};

const initialState = {
    allSpots: {}, singleSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case  LOAD_SPOTS:

            const newState = { ...state, allSpots: { ...state.allSpots } }
            // console.log("action.spots =>",action.spots)
            action.spots.Spots.forEach(spot => newState.allSpots[spot.id] = spot)

            return newState
        default:
            return state;
    }
};

export default spotsReducer;
  // Review: {
    //     Spot: {
    //         ReviewId: {},
    //         User: {},
    //         ReviewImages: []
    //     }
    // },
    // User: {
    //     ReviewId: {
    //         User: {},
    //         Spot: {},
    //         ReviewImages: []
    //     }
    // },
    // Bookings: {
    //     User: {
    //         bookingId: {
    //             Spot: {}
    //         }
    //     },
    //     Spot: {
    //         bookingId: {}
    //     }
    // }
