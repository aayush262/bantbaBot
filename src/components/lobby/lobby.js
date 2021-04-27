import { Component } from "react";
import React from 'react';
import axios from "axios";
import cogoToast from "cogo-toast";
import { DateCounter } from "../dateCount/dateCount";
import Modal from 'react-modal';


Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        border: 'none',
        background: 'transparent',
        overflow: 'visible',
        transform: 'translate(-50%, -50%)'
    }
};

export class Lobby extends Component {
    constructor() {
        super()
        this.state = {
            isCreate: false,
            isLeague: false,
            isAdding: false,
            isJoining: false,
            modalIsOpen: false,
            data: {
                date: '',
                type: '',
                owner: '',
                time: '',
                game: '',
                type: ''
            },
            lobbies: [
                {
                    name: '',
                    type: '',
                    timestamp: '',
                    game: '',
                    players: [{
                        id: '',
                        name: ''
                    }],
                    owner: {
                        name: '',
                        id: ''
                    }
                }
            ]
        }
    }
    handleCreate = (type) => {
        this.setState(preState => {
            return {
                isCreate: !preState.isCreate,
                isLeague: type === 'league' ? true : false.isCreate,
                data: {
                    owner: {
                        id: this.props.user._id,
                        name: this.props.user.name
                    },
                    game: 'Dota2',
                    type
                }
            }
        })
    }
    changeHandler = (e) => {
        const { name, value } = e.target;
        this.setState(preState => {
            return {
                ...preState,
                data: {
                    ...preState.data,
                    [name]: value
                }
            }
        })
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.setState((preState) => {
            return {
                ...preState,
                isAdding: true
            }
        }, async () => {
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/lobby`,
                    this.state.data
                    , {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        responseType: 'json'
                    })
                cogoToast.success(data.message);
                const info = await axios.get(`${process.env.REACT_APP_BASE_URL}/lobby`)
                this.setState((preState) => {
                    return {
                        ...preState,
                        lobbies: info.data,
                        isCreate: false,
                        isAdding: false
                    }
                })
            } catch (e) {
                console.log(e)
            }
        })
    }
    componentDidMount() {
        this.interval = setInterval(async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/lobby`)

            this.setState((preState) => {
                return {
                    ...preState,
                    lobbies: data,

                }
            })

        }, 1000)

    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handleDelete = async (id) => {
        const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/lobby/${id}`)
        cogoToast.success(data.message)
        const info = await axios.get(`${process.env.REACT_APP_BASE_URL}/lobby`)
        this.setState((preState) => {
            return {
                ...preState,
                lobbies: info.data
            }
        })

    }

    handleJoin = (id) => {
        this.setState((preState) => {
            return {
                ...preState,
                isJoining: true
            }
        }, async () => {
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/lobby/${id}`, {
                    id: this.props.user._id,
                    name: this.props.user.name
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    responseType: 'json'
                })

                cogoToast.success(data.message);
                this.setState((preState) => {
                    return {
                        ...preState,
                        isJoining: false
                    }
                })
            } catch (e) {
                console.log(e)
            }
        })
    }

    checkJoin = (players) => {
        let isJoin = false
        players.forEach((player) => {
            if (player.id === this.props.user._id) {
                isJoin = true
            }
        })
        return isJoin;
    }

    closeModal = () => {
        this.setState((preState) => {
            return {
                ...preState,
                modalIsOpen: false
            }
        })
    }

    openModal = () => {
        this.setState((preState) => {
            return {
                ...preState,
                modalIsOpen: true
            }
        })
    }

    render() {

        console.log(this.state)
        return (
            <>
                <section className="pt-mobile-80">

                    <div className="container">
                        <div className="row medium-padding100">

                            <div className="col-lg-3 col-md-4 col-sm-5 col-xs-6 mb30" data-mh="pricing-item" >
                                <div className="crumina-module crumina-pricing-table pricing-table--style1">
                                    <div className="pricing-thumb">
                                        <img src={this.props.user.avatar} className="woox-icon" alt="bitcoin" />
                                    </div>
                                    <h5 className="pricing-title">{this.props.user.name} <span></span></h5>
                                    <div className="price">
                                        <div className="price-sup-title">League</div>
                                        <div className="price-value"><button onClick={this.handleCreate.bind(this, 'league')} className="btn btn--large btn--transparent btn--primary ">Create</button></div>
                                    </div>
                                    <div className="price-sup-title">Lobby</div>
                                    <a onClick={this.handleCreate.bind(this, 'lobby')} className="btn btn--large btn--green-light btn--transparent">Create</a>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-7 col-xs-6 mb30" data-mh="pricing-item">
                                {this.state.isCreate ? <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <form className="contact-form" onSubmit={this.submitHandler}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group label-floating">
                                                    <label className="input-label control-label">{this.state.isLeague ? 'League' : 'Lobby'} name <abbr className="required" title="required">*</abbr></label>
                                                    <input required={true} onChange={this.changeHandler} name='name' className="form-control input--squared input--dark" type="text" />
                                                    <span className="material-input" /></div>
                                                <div className="form-group label-floating">
                                                    <label className="input-label control-label">Start Time <abbr className="required" title="required"></abbr></label>
                                                    <input required={true} onChange={this.changeHandler} name='time' className="form-control input--squared input--dark" type="time" />
                                                    <span className="material-input" /></div>

                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group label-floating">
                                                    <label className="input-label control-label">Start Date <abbr className="required" title="required"></abbr></label>
                                                    <input required={true} onChange={this.changeHandler} name='date' className="form-control input--squared input--dark" type="date" />
                                                    <span className="material-input" /></div>
                                                <div className="form-group label-floating">
                                                    <label className="input-label control-label">Select Game <abbr className="required" title="required"></abbr></label>
                                                    <select onChange={this.changeHandler} name='game'><option value='Dota2'>Dota2</option>
                                                        <option value='Chess'>Chess</option></select>
                                                    <span className="material-input" /></div>
                                                <button disabled={this.state.isAdding ? true : false} className={this.state.isLeague ? "btn btn--large btn--primary" : "btn btn--large btn--green-light "}>{this.state.isAdding ? 'creating' : 'create'} {this.state.isLeague ? 'League' : 'Lobby'}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div> : <></>}
                                {this.state.lobbies.length !== 0 ? <h4>Recent Leagues / Lobbies</h4> : <></>}
                                {this.state.lobbies.length !== 0 ?
                                    this.state.lobbies.map((lobby) => {

                                        return <div key={lobby._id}>

                                            <div style={{ background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${lobby.game === 'Chess' ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFoJYHvH8RZt_QkDQ_SirIaNqSz3X0T3Aeg&usqp=CAU" : "https://wallpapercave.com/wp/wp2532627.jpg"})`, backgroundPosition: 'center', backgroundSize: 'cover', marginBottom: '40px', border: '2px solid #ffba00' }} className="crumina-module crumina-event-item">
                                                <div className="event-thumb bg-event5">
                                                    <div className="overlay" />
                                                </div>

                                                <div className="event-content">
                                                    <h3 style={{ color: '#34e5eb' }} className="event-title mb20">{lobby.name}</h3>
                                                    <h4 className="event-title mb15">{lobby.timestamp - (Date.now()+20700000) >= 0 ? <DateCounter duration={lobby.timestamp - (Date.now()+20700000)}></DateCounter> : <>Countdown Completed.</>}</h4>
                                                    {lobby.timestamp - (Date.now()+20700000) >= 0 ? <></> : <><button className="btn btn--medium btn--secondary">Check Matches</button></>}
                                                    {lobby.owner.id === this.props.user._id ? <button onClick={this.handleDelete.bind('this', lobby._id)} className="btn btn--medium  btn--blue-light">Collapse</button> : <></>}
                                                </div>
                                                <div className="event-venue">
                                                    <div className="event-date">

                                                        <h6 onClick={this.openModal}><i className="fas fa-users"></i> {lobby.players.length}</h6>
                                                    </div>
                                                    <div className="event-date">

                                                        <h6><i className="fas fa-gamepad"></i>&nbsp;{lobby.game}</h6> &nbsp;{Date.now()+20700000 >= lobby.timestamp ? <button className="btn btn--small btn--dark">Expired </button> : this.checkJoin(lobby.players) ? <button className="btn btn--small btn--green-light">Joined </button> : this.state.isJoining ? <button disabled={true} className="btn btn--small btn--green-light">Joining </button> : <button onClick={this.handleJoin.bind(this, lobby._id)} className="btn btn--small btn--green-light">Join </button>}
                                                    </div>

                                                    <div className="author-block">
                                                        <div className="avatar avatar60">
                                                            <h5>Type:</h5>
                                                        </div>
                                                        <div className="author-content">
                                                            <h5>{lobby.type}</h5>

                                                        </div>
                                                    </div>
                                                    <p>Created by : {lobby.owner.name}</p>
                                                </div>
                                            </div>
                                            <Modal
                                                isOpen={this.state.modalIsOpen}

                                                onRequestClose={this.closeModal}
                                                style={customStyles}
                                                contentLabel="Players Modal"
                                            >

                                                <div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <table className="table--style2">
                                                            
                                                            <tbody>
                                                            {lobby.players.map(player=>{
                                                                        return <tr key={player.id}>
                                                                            <td>{player.name}</td>
                                                                        </tr>
                                                                    })}


                                                            </tbody>

                                                        </table>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    })

                                    : <h4>No any Lobbies/ Leagues</h4>}
                            </div>
                        </div>

                    </div>
                </section>

            </>
        )
    }

}