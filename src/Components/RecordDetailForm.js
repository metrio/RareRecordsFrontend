import React from 'react'

class RecordDetailForm extends React.Component {

    state ={

    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitAlbum = ( details) => {
        const recordList = this.props.records
        const foundRecordArray = recordList.filter(recordEl => recordEl.discogs_id === details.discogs_id)
        const owner = this.props.owner
       
        if(foundRecordArray.length > 0){
    
          foundRecordArray[0]["notes"] = details.notes
          foundRecordArray[0]["resource_url"] = details.resource_url
          foundRecordArray[0]["format"] = details.formats
          foundRecordArray[0]["catno"] = details.catno
          foundRecordArray[0]["label"] = details.label
          foundRecordArray[0]["country"] = details.country
    
          const foundRecord = foundRecordArray[0]
           
          this.props.addtoRecordStore(owner, foundRecord)
        } else {
           this.props.addtoRecordsAndRecordStore(owner, details)
        }
      }  

    render() {
        return (
            <form onSubmit={this.submitRecordHandler} className="record-form" >

            </form>
        )
    }
}


export default RecordDetailForm