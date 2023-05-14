import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useModal } from "../../../../context/Modal";

import { newReview } from "../../../../store/reviewsReducer";

const CreateReview = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [review setReview] = useState('')



    const createNewReview = {
        "userId": user.id,
        "spotId": spot.id,
        "review": review,
        "stars": stars
    }


}

export default CreateReview
