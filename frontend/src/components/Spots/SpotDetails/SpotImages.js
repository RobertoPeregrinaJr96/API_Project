const SpotImages = ({ spot }) => {
    console.log(spot)
    const images = spot.SpotImages

    if (images.length < 5)
        for (let i = images.length; i < 5; i++) {
            images.push({ id: i, url: 'placeHolderUrl.com' })
        }

    // console.log('spot images ===>', images)

    let imageCount = 1
    // let count = 0
    return (
        <>
            {
                images.map((img) => {
                    return <li className={`spot-image-${imageCount++}`}>
                        <img src={'https://cdn.discordapp.com/attachments/1088906268485357618/1105152225992507502/gettyimages-1269776313-612x612.jpg'} alt={''}>
                        </img>
                    </li>
                })
            }

        </>
    );
};

export default SpotImages;
