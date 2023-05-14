const ReviewItems = ({ review }) => {
    // console.log('array', review)
    const date = new Date(review.createdAt).toDateString()
    // console.log("Date ==>", date)
    let i = 0
    return (

        <p>{review.User.firstName}{review.User.lastName}{'   '}
            {date}
            <br></br>
            {review.review}
        </p>

    )
}

export default ReviewItems
