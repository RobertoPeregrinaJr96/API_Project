import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css';
import { fetchUserReviewsThunk } from '../../store/reviewsReducer';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from './DeleteModal';

const UserReviews = () => {

    const dispatch = useDispatch()

    const reviewsObj = useSelector(state => state.reviews.userReviews)
    console.log('222', reviewsObj)
    const reviews = Object.values(reviewsObj)
    console.log('dsfsd', reviews)

    useEffect(() => {
        dispatch(fetchUserReviewsThunk())
    }, [dispatch])

    return (
        <div>
            <p> My UserReviews</p>
            <ul>
                {reviews ? reviews.map(review => {
                    return (
                        <li>
                            <div className='review-wrapper'>
                                <div>
                                    <p>{review.Spot['address']}</p>
                                    <p>{review.createdAt}</p>
                                    <p> {review.review}</p>
                                </div>
                                {console.log("eeeeee",review)}
                                <div>
                                    <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteModal reviewsObj={review} />}>

                                    </OpenModalButton>
                                </div>
                            </div>
                        </li>
                    )
                }) : <p>No Reviews</p>}

            </ul>
        </div >
    )
}



export default UserReviews
