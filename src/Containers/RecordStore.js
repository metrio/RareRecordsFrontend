import React from 'react';
import { connect } from 'react-redux'
import RecordStoreCard from '../Components/RecordStoreCards';


class RecordStore extends React.Component {

    displayRecords = () => {
      return this.props.recordstore.map(recordEl => <RecordStoreCard key={recordEl.id} recordEl={recordEl} />)
    }

    render () {
      
    
        return (
          <body className="record-store">
              <div className="recordstore-wrapper">
                <h1>Rare Records Store</h1>
                {console.log(this.props.recordstore)}
                {this.displayRecords()}
              </div>
          </body>
            
        )
      } 
    }

    function msp(state) {
        return {
          user: state.user,
          owner: state.owner,
          records: state.records,
          recordstore: state.recordstore
        }
      }

export default connect(msp)(RecordStore);