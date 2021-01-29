import React from 'react'
import { connect } from 'react-redux'
import diver from '../assets/diver-silhouette.png'




class HomePage extends React.Component  {
   

     componentDidMount = () => {
        const randomImgPlaceFn = this.randomImgPlace
        let intervalId
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
    let records = this.props.records
   

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