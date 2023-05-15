const SpotImages = ({ spot }) => {
    // console.log(spot)
    const images = spot.SpotImages
    // console.log('images in SpotImages', images)

    let length;
    if(images){
        length = images.length
    }
    // console.log('array length', length)

    for (let i = length; i < 5; i++) {
        images.push({ url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537828399628411/images_7.jpg' })
    }
    // console.log('array length', length)
    // console.log('images in SpotImages', images)

    if (Object.values(images).length === 0) {
        return null;
    }
    if (Object.values(spot).length === 0) {
        return null;
    }

    return (
        <div className="image-div">
            <li>
                <div className="main-image">
                    <img className="image-0" src={images[0].url}></img>
                </div>
            </li>
            <li>
                <div className="side-image">
                    <img src={images[1].url}></img>
                    <img src={images[2].url}></img>
                    <img src={images[3].url}></img>
                    <img src={images[4].url}></img>
                </div>
            </li>


        </div>
    );
};

export default SpotImages;
