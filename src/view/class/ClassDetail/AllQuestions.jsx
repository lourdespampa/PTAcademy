import React, { Component, useState } from "react";
import axios from 'axios';
export default class AllQuestions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            see: false
        }
        this.ShowAnswer = this.ShowAnswer.bind(this);
    }

    ShowAnswer(see) {
        this.setState({ see });
    }
    render() {
        return (
            <>
                <div className="QuestionsListClass">     
                    <div className="QuestionsCards">
                        {this.props.question}
                        <button className="classTrivia__button-Edit" onClick={() => this.ShowAnswer(true)}>
                             <i className="far fa-eye"></i>
                        </button>
                        {/* <button for="hide" className="classTrivia__button-Edit" >
                            <i className="far fa-eye-slash"></i>
                        </button> */}
                        {/* {this.state.see ? (
                                <button className="classTrivia__button-Edit" onClick={this.ShowAnswer()} >
                                    <i className="far fa-eye"></i>
                                </button>
                            ) : (
                                <button className="classTrivia__button-Edit" onClick={this.state.see} >
                                       <i class="far fa-eye-slash"></i>
                                    </button>
                                )} */}
                        <button className="classTrivia__button-Edit" onClick={() => this.ShowAnswer(false)}>
                            <i class="far fa-eye-slash"></i>
                        </button>
                        {this.state.see ? (
                        <div id="AnswersCards">
                            <p>{this.props.answer1}</p>
                            <p>{this.props.answer2}</p>
                            <p>{this.props.answer3}</p>
                            <p>{this.props.answer4}</p>
                            {this.vistaBancoPreguntas}
                        </div>) : ( 
                            <div id="AnswersCards"></div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
