import React from 'react'
import { connect } from 'react-redux'



class HomePage extends React.Component  {

render () {
    let records = this.props.records

    return (
        <span className="homepage">
            <h1> Welcome to RareRecords</h1>
                { records !== undefined ?
                <div className="records-array">
                {console.log(records)}
                {records.map(recordEl => <img  key={recordEl.id} src={recordEl.thumb_url}  alt={recordEl.album_name} />)}
                </div>
                :
                null
                }
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