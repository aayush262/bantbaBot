import React from 'react';

export class DateCounter extends React.Component {
    constructor(){
        super()
        this.state={
            date: ()=>{

            }
        }
    }
    componentDidMount(){
      
            
                this.setState({
                    date: (duration) => {

                        let seconds = Math.floor((duration / 1000) % 60);
                        let minutes = Math.floor((duration / (1000 * 60)) % 60);
                        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
                        let days = Math.floor(duration / (1000 * 60 * 60 * 24));
                        hours = (hours < 10) ? "0" + hours : hours;
                        minutes = (minutes < 10) ? "0" + minutes : minutes;
                        seconds = (seconds < 10) ? "0" + seconds : seconds;
                        days = (days>10)? "0" + days: days;
                        return `${days} Days ${hours} Hours ${minutes} Minutes ${ seconds} Secs`
                    }
                })
        
        
    }



    render(){
        return <>{this.state.date(this.props.duration)}</>
    }
}