import { Link } from 'react-router-dom';

const SpotIndexItem = ({ spot }) => {
    // let areaNumber = 0

    const stars = () => {
        let stars = <li className='spot-review-stars-li'>&#9733;</li>;
        const num = spot.avgRating
        const arr = []
        if (num === null || num === undefined) return ''
        for (let i = num; i <= 5; i++) {
            arr.push(stars)
        }
        // console.log('stars ===>', stars)
        return arr
    }

//     const url = () => {
//         console.log(spot.previewImage)
//         if (spot.previewImage) return spot.previewImage
//         return 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537828399628411/images_7.jpg'
//     }
// console.log(spot.previewImage)
    return (
        <li key={spot.id} className='spot-list'>
            <div className='spot-list-block tool-tip'>
                <span className='tool-tip-text'>{spot.name}</span>
                <Link to={`/spots/${spot.id}`} className={'spot-Link'}>
                    <img src={spot.previewImage} alt='di' className='spots-landingPage-img'></img><br></br>
                    {/* {spot.name},{'  '} */}
                    {spot.city},{'  '}
                    {spot.state}<br></br>
                    ${spot.price}/night
                    <ul className='spot-review-stars'>{stars()}
                        <p className='spot-review-stars-p'>{spot.avgRating}</p>
                    </ul>
                </Link>
            </div>
        </li >
    );
};

export default SpotIndexItem;
