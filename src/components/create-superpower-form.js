import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';
import {updatePointsAction,initPage,createPower} from '../actions/superpowers';

export class CreatePowerForm extends React.Component{

	componentDidMount() {
        this.props.dispatch(initPage());
    }

	onSubmit(values){
		return this.props.dispatch(createPower(values));
	}

	resetValues(event){
		event.preventDefault();
		this.props.change("powerName","");
		this.props.change("powerAttack","0");
		this.props.change("powerDefence","0");
		this.props.change("powerSpecialAttack","0");
		this.props.dispatch(initPage());
	}

	normalizer(key,value){

		this.props.dispatch(updatePointsAction(key,value));

		if(parseInt(this.props.availablePoints,10) === 0){
			return String(this.props.currentPower[key])
		}

		else{
			return value;
		}
	}

	render(){
		let success;
		if (this.props.success) {
	            success = (
	                <div className="form-error formSuccess" aria-live="polite">
	                    Superpower Created!
	                </div>
	            );
	        }
		let error;
			if (this.props.error) {
	            error = (
	                <div className="form-error formError" aria-live="polite">
	                    {this.props.error}
	                </div>
	            );
	        }
		return(
			<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<h1 className="pageHeader">Available Points {this.props.availablePoints}</h1>
				<p className="pageInfo">You can create your own superpowers here! Experiment with the different values and see what works best!</p>
				{error}
				{success}
				<label className="labelDefault" htmlFor="powerName">Power Name:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="text"
					name="powerName"
					validate={[required,nonEmpty,isTrimmed]}/>
				<label className="labelDefault" htmlFor="powerAttack">Superpower Attack:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="number"
					name="powerAttack"
					normalize={this.normalizer.bind(this,"powerAttack")}
					min="0"
					max="100"
					validate={[required,nonEmpty]}/>
				<label className="labelDefault" htmlFor="powerDefence">SuperPower Defence:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="number"
					name="powerDefence"
					normalize={this.normalizer.bind(this,"powerDefence")}
					min="0"
					max="100"
					validate={[required,nonEmpty]}/>
				<label className="labelDefault" htmlFor="powerSpecialAttack">Superpower Special Attack:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="number"
					name="powerSpecialAttack"
					normalize={this.normalizer.bind(this,"powerSpecialAttack")}
					min="0"
					max="100"
					validate={[required,nonEmpty]}/>
					<button
                    type="submit"
                    className="buttonDefault" 
                    disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
                <button
                className="buttonDefault" 
                onClick={(e) => this.resetValues(e)}
                    >
                    Reset
                </button>
			</form>
		)
	}
}

const mapStateToProps = state => ({
    currentPower: state.superpowers.currentPower,
    availablePoints: state.superpowers.currentPower.availablePoints,
    success:state.superpowers.message
});

CreatePowerForm = connect(mapStateToProps)(CreatePowerForm);

export default reduxForm({
    form: 'superpowers',
    initialValues:{
    	powerAttack:"0",
    	powerDefence:"0",
    	powerSpecialAttack:"0"
    },
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('superpowers','powerName'))
})(CreatePowerForm);