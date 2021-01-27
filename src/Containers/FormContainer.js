import React from 'react'
import RecordDetailForm from '../Components/RecordDetailForm'
import { connect } from 'react-redux'
import { addtoRecordsAndRecordStore, updateBackendRecords } from '../Redux/actions'

class FormContainer extends React.Component{


    submitAlbum = (record) => {
        const recordList = this.props.records
        const foundRecordArray = recordList.filter(recordEl => recordEl.discogs_id === record.discogs_id)
        const owner = this.props.owner
        let location = this.props.routerProps.history
       
        if(foundRecordArray.length > 0){
          const foundRecord = record
          foundRecord.id = foundRecordArray[0].id
           
          location.replace(`/record-store`)
          this.props.updateBackendRecords(owner, foundRecord)
        } else {
            location.replace(`/record-store`)
            this.props.addtoRecordsAndRecordStore(owner, record)
        }
      }  



    render(){
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