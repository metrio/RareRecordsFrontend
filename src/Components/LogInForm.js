import React from 'react'


class LogInForm extends React.Component {
    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        
        let location = this.props.routerProps.history
        location.replace("/profile")
        this.props.submitHandler(this.state)

    }

    render(){
        return(
            <div className="form-div">
                <h1>Log In</h1>
                <form onSubmit={this.submitHandler} className="form">
                    <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
                    <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
                    <button>Log In</button>
                </form>
            </div>
        )
    }
}

export default LogInForm