import React from 'react'


class SearchForm extends React.Component {

    state = {
        artist_name: "",
        record_name: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        
        this.props.submitHandler(this.state)
    }

    render(){
        return(
            <div className="search-div">
                <form onSubmit={this.submitHandler} className="form">
                    <input type="text" name="record_name" placeholder="Record Name" value={this.state.record_name} onChange={this.changeHandler} />
                    <input type="text" name="artist_name" placeholder="Artist Name" value={this.state.artist_name} onChange={this.changeHandler} />
                    
                    <button>Search</button>
                </form>
            </div>
        )
    }
}

export default SearchForm