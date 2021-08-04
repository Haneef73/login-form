import React from "react";
import "./index.css";
import './App.css';
import axios from "axios";
import  "sweetalert"

const api = axios.create({
  baseURL: `http://localhost:3001/info/`
})

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: true,
      right: 0,
    }
  }

  handleClick(button) {
    if(this.state.newUser && button !== 'signUp') {
      this.setState({newUser: false})
    } else if(!this.state.newUser && button !== 'signIn') {
      this.setState({newUser: true})
    }
  }
  
  
  render() {
    return(
           <div className='formContainer'>
              <div className='formHeader'>
                  <div 
                    className={ this.state.newUser ? 'headerActive' : 'headerInActive' } 
                    onClick={() => this.handleClick('signUp')}
                    >
                    <button className='headerButton'> Sign Up </button>
                  </div>
                  <div 
                    className={ this.state.newUser ? 'headerInActive' : 'headerActive' } 
                    onClick={() => this.handleClick('signIn')}
                    >
                    <button className='headerButton'> Sign In </button>
                  </div>
              </div>
              <div className='formBody'>
                {
                  this.state.newUser ? <SignUp />: <SignIn />
                }
              </div>
           </div>
    ) 

  }
}


class SignUp extends React.Component {

  constructor(){
    super();

    this.state = {
      Name : "",
      Email : "",
      Password : "",
    }
    
  }
  
  InfoChange = event => {
      const {name, value} = event.target;
      this.setState({
        [name] : value
      })
  }

  InfoSubmit = event => {
    event.preventDefault();

    var data = {
      Name : this.state.Name,
      Email : this.state.Email,
      Password : this.state.Password,
    }
    if(data.Password !== this.state.RePassword){
      window.swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Password Mismatching, Pls Enter Correct Password!',
      })
    }else
    {
      api.post("/",data).then(res => {
        console.log(res.data,"welldone");
        window.swal("Welocome!", "SignUp Successfully!", "success");
      }).catch(err => {
        console.log(err)
        window.swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Already registerd this  email! Pls Goto login!',
        })
      });
    }

    this.setState({
      Name : "",
      Email : "",
      Password : "",
      RePassword : "",

    })

}


render() {
    return( 
      <form onSubmit = {this.InfoSubmit}>   
      <div className='signUpContainer' >
      
        <h4 className='headerText'>Join Us Today</h4>
        <div className='inputSection'>
          <input type='text' className='fullName' required 
          onChange = {this.InfoChange}
          name = "Name"
          value = {this.state.Name}
          />
          <label className='inputLabel'>Full Name</label>
        </div>
        <div className='inputSection'>
          <input type='text' className='emailAddress' required
                    onChange = {this.InfoChange}
                    name = "Email"
                    value = {this.state.Email}
                    />
          <label className='inputLabel'>Email Address</label>
        </div>
        <div className='inputSection'>
          <input type='password' className='password' required
                    onChange = {this.InfoChange}
                    name = "Password"
                    value = {this.state.Password}
          />
          <label className='inputLabel'>Password</label>
        </div>
        <div className='inputSection'>
          <input type='password' className='password' required
                    onChange = {this.InfoChange}
                    name = "RePassword"
                    value = {this.state.RePassword}
          />
          <label className='inputLabel'>Re Enter Password</label>
        </div>
        <div className='formFooter'>
                <button className='saveForm'> SignUp </button>
              </div>
      </div>
      </form>
    )
  }
}

class SignIn extends React.Component {
  constructor(){
    super();

    this.state = {
      Email : "",
      Password : "",
    }
  }

  UserInfo = event => {
    const {name, value} = event.target;
    this.setState({
      [name] : value
    })

}

LoginSubmit = event => {
  event.preventDefault();
  var data = {
    Email: this.state.Email,
    Password: this.state.Password
  }

  api.post("/login", data).then(res => {
    window.swal("Welocome!", "Login Successfully!", "success");

    this.setState({
      Email : "",
      Password : "",
    })
  }).catch(err => {
    console.log(err);
    window.swal({
      icon: 'error',
      title: 'Oops...',
      text: 'Check your Email and Password is valid..!',
    })

  })


}

  render() {
    return(
      <form onSubmit={this.LoginSubmit}>
      <div className='signInContainer'>
        <h4 className='headerText'>Welcome Back</h4>
        <div className='inputSection'>
          <input type='text' className='email' required
                  onChange = {this.UserInfo}
                  name = "Email"
                  value = {this.state.Email}
          />
          <label className='inputLabel'>Email ID</label>
        </div>
        <div className='inputSection'>
          <input type='password' className='password' required
                  onChange = {this.UserInfo}
                  name = "Password"
                  value = {this.state.Password}
          />
          <label className='inputLabel'>Password</label>
        </div>
        <div className='formFooter'>
                <button className='saveForm'> Login </button>
              </div>
      </div>
      </form>
    )
  }
}


export default LoginForm;
