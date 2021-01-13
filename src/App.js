import React from 'react'
import RecordCard from './Components/RecordCard';
import SearchForm from './Components/SearchForm';

class App extends React.Component {
  
  state = {
    data: []
  }

  recordSearch = (searchObj) => {
    const token = process.env.REACT_APP_DISCOGS_API_KEY
    const artist = searchObj.artist_name
    const record = searchObj.record_name
    
    const url = `https://api.discogs.com/database/search?artist=${artist}&release_title=${record}&format=vinyl&token=${token}`

    this.componentDidMount(url)
  }

  componentDidMount = (url) => {
    fetch(`${url}`)
    .then(resp => resp.json())
    .then( query => {
      this.setState({data: query.results})
    })
  }


  render () {
    const { data } = this.state

    return (
      
      <div className="App">
        <SearchForm submitHandler={this.recordSearch}/>
        {data.map(recordEl => <RecordCard id={recordEl.id} recordObj={recordEl} />)}
      </div>
        
  )
  } 
}

export default App;
