import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_SPOTS = 'Spots/LOAD_SPOTS';
export const RECEIVE_SPOTS = 'Spots/RECEIVE_SPOTS';
export const UPDATE_SPOTS = 'Spots/UPDATE_SPOTS';
export const REMOVE_SPOTS = 'Spots/REMOVE_SPOTS';
export const SINGLE_LOAD_SPOT = 'Spots/SINGLE_LOAD_SPOT'
/**  Action Creators: */
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const singleLoadSpot = (spot) => ({
    type: SINGLE_LOAD_SPOT,
    spot
})

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
// get all spots // should be good
export const fetchSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots));
    }
};
// get spot by Id
export const fetchDetailedSpotThunk = (spotId) => async (dispatch) => {
    // console.log(spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`)
    // console.log('response ===> ',response)
    if (response.ok) {
        const spot = await response.json()
        // console.log('spot ===>',spot);
        dispatch(singleLoadSpot(spot))
    }
};
// delete a spot
export const deleteSpot = (spotId) => async (dispatch) => {
    console.log("DELETE")
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });
    console.log('res ====>', res)
    const data = await res.json()
    console.log('data ===>', data)
    if (res.ok) {
        dispatch(removeSpot(spotId));
    }
};
// create a spot
export const createSpot = (spot, image) => async (dispatch) => {
    console.log("spot ===>", spot)
    console.log("image ===>", image)

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });
    console.log('Response ===>', res)
    if (res.ok) {
        const newSpot = await res.json();
        spot.avgStarRating = 0;
        console.log('newSpot ===>', newSpot)
        for (let i of image) {
            // for the images // preview image
            console.log('i ===>', i)
            let img = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(i),
            })
            console.log('img ===>', img)
            const images = await img.json();
            console.log('images ===>', images)
        }
    }
}
// update a spot
export const updateSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });
    console.log("Response ====>", res)
    if (res.ok) {
        const updatedSpot = await res.json();
        console.log("data ====>", updatedSpot)
        dispatch(editSpot(updatedSpot));
        return updatedSpot;
    } else {
        const errors = await res.json();
        console.log(errors)
        return errors;
    }
};

const initialState = {
    allSpots: {}, singleSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            let newState = { ...state, allSpots: { ...state.allSpots } }
            action.spots.Spots.forEach(spot => newState.allSpots[spot.id] = spot)
            return newState
        case SINGLE_LOAD_SPOT:
            // console.log('action.Spot.singleSpot ====>',action.singleSpot)
            return { ...state, singleSpot: { ...action.spot } }
        case REMOVE_SPOTS:
            delete newState[action.spotId]
            return newState
        case RECEIVE_SPOTS:
            return { ...state, allSpots: action.spot };
        case UPDATE_SPOTS:
            return { ...state, allSpots: action.spot };
        default:
            return state;

    }
};

export default spotsReducer;
