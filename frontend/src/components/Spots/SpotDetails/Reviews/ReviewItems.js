


const ReviewItems = ({ review }) => {

    console.log('array', review)

    const date = new Date(review.createdAt).toDateString()
    // console.log("Date ==>", date)
    let i = 0
    return (
        <>
            <li key={i++}>
                {review.User.firstName}
                {'  '}
                {date}
                <br></br>
                <br></br>
                {review.review}
            </li>
            <br></br>
        </>
    )
}

export default ReviewItems
