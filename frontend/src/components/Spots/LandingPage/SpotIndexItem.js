import { Link } from 'react-router-dom';

const SpotIndexItem = ({ spot }) => {

    const rightRating = () => {
        let rating = spot.avgRating
        if (rating === undefined || rating === null) {
            rating = "New"
            // console.log(' no rating', rating)
            return rating
        }
        else if (rating - Math.floor(rating) === 0) {
            rating = `${rating}.0`
            // console.log('new rating', rating)
            return rating
        } else {
            // console.log('fixed rating', rating.toFixed(1))
            return rating.toFixed(1)
        }
    }


    if (!spot && !spot.id) return null
    return (
        <li key={spot.id} className='spot-list'>
            <div className='spot-list-block tool-tip'>
                <span className='tool-tip-text'>{spot.name}</span>
                <Link to={`/spots/${spot.id}`} className={'spot-Link'}>
                    <img src={spot.previewImage} alt='di' className='spots-landingPage-img'></img>
                    <div className='spot-content'>
                        <div className='spot-name'>
                            {spot.city},
                            {spot.state}
                        </div>
                        <div className='star-rating'>
                            <p>&#9733;</p>
                            <p className='spot-review-stars-p'>{rightRating()}</p>
                        </div>
                        <div className='spot-price'>
                            ${spot.price} night
                        </div>

                    </div>
                </Link>
            </div>
        </li >
    );
};

export default SpotIndexItem;
