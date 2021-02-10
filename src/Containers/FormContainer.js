import React from 'react'
import RecordDetailForm from '../Components/RecordDetailForm'
import { connect } from 'react-redux'
import { addtoRecordsAndRecordStore, updateBackendRecords } from '../Redux/actions'

class FormContainer extends React.Component{


    submitAlbum = (record) => {
        const recordList = this.props.records
        // use find https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        // so this could be:
        // const foundRecord = recordList.find(recordEl => recordEl.discogs_id === record.discogs_id)
        const foundRecordArray = recordList.filter(recordEl => recordEl.discogs_id === record.discogs_id)
        const owner = this.props.owner
        let location = this.props.routerProps.history
       
        // find returns the (first) found item in an array or null if it can't find nuthin' 
        // so when you get here, instead of having to check the length of the array
        // you can just do:
        // if (foundRecordArray) {}
        if(foundRecordArray.length > 0){
          // you should clone this not set the value to this instance:
          // const foundRecord = {...record}
          // less lines:
          // const foundRecord = {...record, id: foundRecordArray[0].id}
          const foundRecord = record 
          foundRecord.id = foundRecordArray[0].id
           
          // im pretty sure react router has a programmatic routing func you can use
          location.replace(`/record-store`)
          this.props.updateBackendRecords(owner, foundRecord)
        } else {
            location.replace(`/record-store`)
            this.props.addtoRecordsAndRecordStore(owner, record)
        }
      }  



    render(){
        // blowing minds:
        // const {details} = this.props
        // this is called destructuring and it's great
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        const details = this.props.details
        return(
            <>
            {console.log("From FormContainer ", details)}
            <RecordDetailForm detailsObj={details} submitHandler={this.submitAlbum} />
            </>
        )

    }
}

function msp(state) {
    return {
      owner: state.owner,
      records: state.records,
      details: state.details
    }
  }
  
  function mdp(dispatch){
    return{
      updateBackendRecords: (owner, recordObj) => dispatch(updateBackendRecords(owner, recordObj)),
      addtoRecordsAndRecordStore: (owner, recordObj) => dispatch(addtoRecordsAndRecordStore(owner, recordObj))
    }
  }
  
  
  export default connect(msp, mdp)(FormContainer)