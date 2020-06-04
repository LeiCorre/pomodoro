import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

let globalSeconds = 0; //partially inspired by answer on stack overflow (setting the variable to null)
let event = new Event('sound')


function ti (e) { //pausing timer partially inspired by answer on stack overflow (setting variable to null after calling clearInterval)
  if (globalSeconds === 0) {
    return globalSeconds = window.setInterval(e, 1000)
   }

   clearInterval(globalSeconds)
   globalSeconds = 0;
  }
  
  

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      session: 1500,
      sec: 1500,
      negSec: -300,
    }
    
    
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.incBreak = this.incBreak.bind(this);
    this.decBreak = this.decBreak.bind(this);
    this.reset = this.reset.bind(this);
    this.ss = this.ss.bind(this);
    this.count = this.count.bind(this);
    this.sound = this.sound.bind(this);
    }

 componentDidMount() {
   document.addEventListener('flip', e => {if(this.state.sec === this.state.negSec-1)
   alert('hello')})
   document.dispatchEvent(event)
 }
 
  increment(event) {
    if(this.state.session <= 3540)
    this.setState({ 
      session: this.state.session + 60,
      sec: this.state.sec + 60
     })
    
  }

  
  decrement(event) {
    if(this.state.session >=120)
      this.setState({ 
        session: this.state.session - 60,
        sec: this.state.sec - 60
       })
       
  }

  incBreak(event) {
    if(this.state.negSec >= -3540)
      this.setState({
        negSec: this.state.negSec -60
      })
       }

  decBreak(event) {
    if(this.state.negSec <= -120)
      this.setState({
        negSec: this.state.negSec +60
      })
  }

  reset(event) {
    this.setState({
      session: 1500,
      negSec: -300,
      sec: 1500
    })

    clearInterval(globalSeconds)
    globalSeconds = 0;
    document.getElementById('beep').pause() //attributed to stack overflow answer linked to
    document.getElementById('beep').currentTime = 0 //attributed to stack overflow answer linked to
    }
 

  ss(event) {    
    if (this.state.sec > this.state.negSec -2)
          this.setState({ sec: this.state.sec - 1 });
    }

  count(event) { 
    ti(this.ss)  
    
    if(this.state.sec === (this.state.negSec-1)) {
      this.setState({ sec: this.state.session })
      ti(this.ss)  
  }
  }

  sound(event) {
    if(this.state.sec === 0 || this.state.sec === this.state.negSec-2)
    document.getElementById('beep').play()
  }

  render() {
    
      document.addEventListener('sound', this.sound)
      document.dispatchEvent(event)
 

    return (
      
        <div className="container-fluid">
        
        <h1>Pomodoro Clock</h1>  
        <div id="start_stop" onClick={this.count}>&#x25B6;&#x23f8;</div> <br />
        <div id="conBox">
        <div id='timer-label'>{this.state.sec > -1? "Session" : this.state.sec === this.state.negSec-2? "Session" : "Break"}
        <audio src="https://raw.githubusercontent.com/LeiCorre/pomodoro/master/src/Clock.mp3" id="beep"></audio>
    <div id='time-left'>
      {this.state.sec >-1? 
        <div id="ses">
          {((this.state.sec - (this.state.sec % 60))/60) <10? 
          '0'+ (this.state.sec - (this.state.sec % 60))/60 : (this.state.sec - (this.state.sec % 60))/60}
          :
          {(this.state.sec % 60) < 10? 
          '0'+this.state.sec % 60: this.state.sec % 60}
      </div> : this.state.sec === this.state.negSec-2? 
      <div>{((this.state.session - (this.state.session % 60))/60) <10? 
        '0'+ (this.state.session - (this.state.session % 60))/60 : (this.state.session - (this.state.session % 60))/60}:00</div>
      :
      <div id="ses2">
          {(((this.state.sec + 1 + this.state.negSec*-1) - ((this.state.sec + 1 + this.state.negSec*-1) % 60))/60) <10? 
          '0'+ ((this.state.sec + 1 + this.state.negSec*-1) - ((this.state.sec + 1 + this.state.negSec*-1) % 60))/60 : ((this.state.sec + 1 + this.state.negSec*-1) - ((this.state.sec + 1 + this.state.negSec*-1) % 60))/60}
          :
          {((this.state.sec + 1 + this.state.negSec*-1) % 60) < 10? 
          '0'+(this.state.sec + 1 + this.state.negSec*-1) % 60: (this.state.sec + 1 + this.state.negSec*-1) % 60}
      </div>
      
      }
      
    </div>
    
        </div>
        </div>
        <div id="reset" onClick={this.reset}>&#8634;</div>
        
        <div className="row">
          <div className='col' >
          
          </div>
          <div className='col-xl-3'>
        <div id="session-label">Session Length</div>
        
        <span id="session-decrement" className="but btn btn-light" onClick={this.decrement}> &#9664;</span>  &nbsp;
        <span id="session-length">{this.state.session/60}</span>  &nbsp;
        <span id="session-increment" className="but btn btn-light" onClick={this.increment}>&#9658; </span>
        
        </div>
        

        <div className='col-xl-3'>
        <div id="break-label">Break Length</div>
        
        <span id="break-decrement" className="but btn btn-light" onClick={this.decBreak}> &#9664; </span> &nbsp;
        <span id="break-length">{this.state.negSec/-60}</span> &nbsp;
        <span id="break-increment" className="but btn btn-light" onClick={this.incBreak}>  &#9658; </span>
        </div>
        <div className='col' />
        </div>
        <br /><br />
        <h3>Designed and Coded by LeiCorre</h3>
        <h5>With reference to <a href="https://stackoverflow.com/questions/13243235/html5-audio-how-to-quickly-stop-and-restart-a-clip">Here</a> for Resetting an Audio Clip
        And the <a href="https://stackoverflow.com/">Stack Overflow</a> in regard to making clearInterval work</h5>
        <h5>Digital Dream font by Jakob Fischer @ <a href="http://pizzadude.dk/site/">Pizzadude.dk</a></h5>
        </div>

      
    )
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById('root'))
export default Pomodoro;
