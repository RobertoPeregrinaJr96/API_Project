import { Link } from 'react-router-dom';

const SpotIndexItem = ({ spot }) => {
    let areaNumber = 0
    return (
        <li key={spot.id} className='spot-list'>
            <div className='spot-list-block'>
                <Link to={`/spots/${spot.id}`} className={'spot-Link'}>
                    <img src={spot.previewImage} ></img><br></br>
                    {spot.name}{'  '}
                    {spot.city}{'  '}
                    {spot.state}<br></br>
                    ${spot.price}/night
                </Link>
            </div>
        </li >
    );
};

export default SpotIndexItem;
