import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

let globalSeconds = 0;
let breakS = 0;

let breakM = 0; //marked for deletion

function ti (e) {
  if (globalSeconds === 0) {
    return globalSeconds = window.setInterval(e, 1000)
   }

   clearInterval(globalSeconds)
   globalSeconds = 0;
  }
  
  
function br (e, m) {
  if (breakS === 0) {
    return breakS = window.setInterval(e, 1000)
   }
   
   if (breakM === 0) { //marked for deletion, some weird error
    return breakM = window.setInterval(m, 60000)
  }

  clearInterval(breakS)
  breakS = 0;
  } 




class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      session: 1500,
      break: 300,
      sec: 1500,
      breakSec: 300
    }
    
    
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.incBreak = this.incBreak.bind(this);
    this.decBreak = this.decBreak.bind(this);
    this.reset = this.reset.bind(this);
    this.ss = this.ss.bind(this);
    this.count = this.count.bind(this);
    this.brCount = this.brCount(this)
    this.bs = this.bs.bind(this);
    this.final = this.final.bind(this)
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
    if(this.state.break <= 3540)
      this.setState({ 
        break: this.state.break + 60,
        breakSec: this.state.breakSec + 60
      })
  }

  decBreak(event) {
    if(this.state.break >=120)
    this.setState({
      break: this.state.break - 60,
      breakSec: this.state.breakSec - 60
    })
  }

  reset(event) {
    this.setState({
      session: 1500,
      break: 300,
      sec: 1500,
      breakSec: 300
    })

    clearInterval(globalSeconds)
    globalSeconds = 0;
    clearInterval(breakS)
    breakS = 0;
    }
 

  ss(event) {
    
    if (this.state.sec > -1)
          this.setState({ sec: this.state.sec - 1 });  
    }

  bs(event) {
    if (this.state.breakSec > 0)
      this.setState({ breakSec: this.state.breakSec - 1 }); 
  }

  

  
  count(event) { 
    ti(this.ss)  
    if (this.state.sec === 0) {
     this.brCount()
    }
  
  }

  brCount(event) {
    br(this.bs)
   if (this.state.breakSec ===0) {
     this.final()
   }
   


  }

  final(event) {
    this.setState({
      sec: this.state.session
    })
  }
  


  render() {
    return (
      
        <div className="container-fluid">
        
        <h1>Pomodoro Clock</h1>  
        <div id="start_stop" onClick={this.count}>&#x25B6;&#x23f8;</div> <br />
        <h3>{this.state.breakSec}</h3>
        
        
        <div id="conBox">
        <div id='timer-label'>{this.state.sec !== -1? "Session" : "Break"}

    <div id='time-left'>
      {this.state.sec !==-1? 
        <div id="ses">
          {((this.state.sec - (this.state.sec % 60))/60) <10? 
          '0'+ (this.state.sec - (this.state.sec % 60))/60 : (this.state.sec - (this.state.sec % 60))/60}
          :
          {(this.state.sec % 60) < 10? 
          '0'+this.state.sec % 60: this.state.sec % 60}
      </div> : <div>
      {((this.state.breakSec - (this.state.breakSec % 60))/60) <10? 
          '0'+ (this.state.breakSec - (this.state.breakSec % 60))/60 : (this.state.breakSec - (this.state.breakSec % 60))/60}
          :
          {(this.state.breakSec % 60) < 10? 
          '0'+this.state.breakSec % 60: this.state.breakSec % 60}
          
      </div>}
      
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
        <span id="break-length">{this.state.break/60}</span> &nbsp;
        <span id="break-increment" className="but btn btn-light" onClick={this.incBreak}>  &#9658; </span>
        </div>
        <div className='col' />
        </div>

        </div>

      
    )
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById('root'))
export default Pomodoro;
