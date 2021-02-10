import React from 'react'
import { connect } from 'react-redux'
import diver from '../assets/diver-silhouette.png'




class HomePage extends React.Component  {
   
    // very cool
    // you can definitely do this without javascript, but we can talk about that another time
    // just gonna post this thing about https://thoughtbot.com/blog/css-animation-for-beginners
    // what you can do is just map through an array of albums and set the delay on the animation based on their order, (likely) no js necessary

     componentDidMount = () => {
        const randomImgPlaceFn = this.randomImgPlace
        let intervalId
        // also you have to make sure you clear your intervals!!!! otherwise they will not stop 
        intervalId = setInterval(randomImgPlaceFn, 6000)
    }

    randomImgPlace = () => {
        const pics = this.props.records.map(record => record.thumb_url)
        const newPicArray = []

        for(let ii = 0; ii < pics.length; ii++){
            const poistionTop= Math.random()*-300
            const positionRight = Math.random()*-300

            let zindex 
            let classname = ""

            if(ii % 7 === 0){
                classname = "img1"
                zindex = Math.random()*10
            }else if(ii % 7 === 1){
                classname = "img2"
                zindex = Math.random()*50
            }else if(ii % 7 === 2){
                classname = "img3"
                zindex = Math.random()*30
            }else if(ii % 7 === 3){
                classname ="img4"
                zindex =  Math.random()*15
            }else if(ii % 7 === 4){
                classname="img5"
                zindex = Math.random()*40
            }else if(ii % 7 === 5){
                classname="img6"
                zindex = Math.random()*25
            }else if(ii % 7 === 6){
                classname="img7"
                zindex = Math.random()*22
            }

       newPicArray.push(<img key={ii} className={classname} src={pics[ii]} style={{ top: `${poistionTop}px`, right: `${positionRight}px`, zIndex: `${zindex}`}} />)
    }

    return newPicArray
    }


render () {
    // see note about let v const
    let records = this.props.records
    // what I would do:
    // const {records} = this.props
   

    return (
        <span className="homepage">
                { records !== undefined ?
                <div className="records-array">
                { this.randomImgPlace()}
                </div>
                :
                null
            }
            <div className="homepage-text">
                <h1> Welcome to RareRecords</h1>

                <h3><span>Where we connect small RecordShop Owners</span> 
                </h3>

                <h3>
                    <span>With Patrons searching </span>
                </h3>
                
                <h3>
                    <span>For their White Whales of Records </span>
                </h3>
            </div>

        </span>
        )
    }
}
function msp(state){
    return{
        records: state.records
    }
}

export default connect(msp)(HomePage)