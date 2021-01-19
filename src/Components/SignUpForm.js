import React from 'react'

class SignUpForm extends React.Component {
    state = {
        username: "",
        email: "",
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
                <h1> Sign Up</h1>
            <form onSubmit={this.submitHandler} className="form">
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
                <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
                <button>Sign up</button>
            </form>
            </div>
        )
    }
}

export default SignUpForm