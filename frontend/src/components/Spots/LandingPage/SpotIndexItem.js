import { Link } from 'react-router-dom';

const SpotIndexItem = ({ spot }) => {
    // let areaNumber = 0

    const stars = () => {
        let stars = <li>&#9733;</li>;
        const num = spot.avgRating
        const arr = []
        if (num === null || num === undefined) return ''
        for (let i = num; i <= 5; i++) {
            arr.push(stars)
        }
        // console.log('stars ===>', stars)
        return arr
    }

    return (
        <li key={spot.id} className='spot-list'>
            <div className='spot-list-block'>
                <Link to={`/spots/${spot.id}`} className={'spot-Link'}>
                    <img src={'https://cdn.discordapp.com/attachments/1088906268485357618/1105152225992507502/gettyimages-1269776313-612x612.jpg'} alt='di'></img><br></br>
                    {spot.name}{'  '}
                    {spot.city}{'  '}
                    {spot.state}<br></br>
                    ${spot.price}/night
                    <ul className='spot-review-stars'>{stars()}</ul>
                </Link>
            </div>
        </li >
    );
};

export default SpotIndexItem;
