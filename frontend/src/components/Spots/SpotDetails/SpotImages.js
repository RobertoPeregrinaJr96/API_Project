const SpotImages = ({ spot }) => {
    console.log(spot)
    const images = spot.SpotImages

    if (images.length < 5)
        for (let i = images.length; i < 5; i++) {
            images.push({ id: i, url: 'placeHolderUrl.com' })
        }

    let imageCount = 1


    return (
        <>

            {
                images.map((img) => {
                    const url = () => {
                        if (img.url === 'placeHolderUrl.com') {
                            return 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537828399628411/images_7.jpg'
                        }
                        return img.url
                    }
                    console.log('img ===>', img)
                    return <li className={`spot-image-${imageCount++}`}>
                        <img src={url()} alt={imageCount++}>
                        </img>
                    </li>
                })
            }

        </>
    );
};

export default SpotImages;
