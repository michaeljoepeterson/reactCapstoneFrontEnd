import {
	GET_POWERS_REQUEST,
	GET_POWERS_SUCCESS,
	GET_POWERS_ERROR,
	UPDATE_POINTS,
	INITIALIZE_PAGE,
	CREATE_POWER_REQUEST,
	CREATE_POWER_SUCCESS,
	CREATE_POWER_ERROR
} from "../actions/superpowers";

const initialState = {
	loading: false,
	powers:null,
	error: null,
	message:null,
	powerNames:null,
	currentPower:{
		availablePoints: "100",
		powerAttack:"0",
		powerDefence:"0",
		powerSpecialAttack:"0",
	}
};

export default function reducer(state = initialState,action){
	if(action.type === INITIALIZE_PAGE){
		return Object.assign({}, state, {
			currentPower:{
			availablePoints: "100",
			powerAttack:"0",
			powerDefence:"0",
			powerSpecialAttack:"0",
		}
        });
	}

	else if(action.type === GET_POWERS_REQUEST){
		return Object.assign({}, state, {
            loading: true,
            error:null
        });
	}

	else if(action.type === GET_POWERS_SUCCESS){
		let powerNamesArr = [];
		for(let i =0;i < action.powers.length;i++){
			powerNamesArr.push(action.powers[i].powerName);
		}
		return Object.assign({}, state, {
			loading:false,
            powers: action.powers,
            powerNames:powerNamesArr,
            error:null
        });
	}
	else if(action.type === GET_POWERS_ERROR){
		return Object.assign({}, state, {
			loading:false,
            error: action.error
        });
	}

	else if(action.type === UPDATE_POINTS){
		let newPowerStats = Object.assign({},state.currentPower);
		
		let sum = 0;
		for (let key in newPowerStats){
			if(key !== "availablePoints"){
				sum += parseInt(newPowerStats[key],10);

			}
		}

		let newAvailablePoints = String(100 - sum);

		if(newAvailablePoints <= 0){
			newAvailablePoints = 0
			newPowerStats.availablePoints = newAvailablePoints;
			return Object.assign({}, state, {
			currentPower:newPowerStats
        });
		}
		else if (newAvailablePoints > 100){
			newAvailablePoints = 100;
		}
		newPowerStats.availablePoints = newAvailablePoints;
		newPowerStats[action.currentStat] = action.currentVal;
		return Object.assign({}, state, {
			currentPower:newPowerStats
        });
	}

	else if(action.type === CREATE_POWER_REQUEST){
		return Object.assign({}, state, {
			loading:true,
			error:null,
			message:null
        });
	}

	else if(action.type === CREATE_POWER_SUCCESS){
		return Object.assign({}, state, {
			loading:null,
			message:"success"
        });
	}
	else if(action.type === CREATE_POWER_ERROR){
		return Object.assign({}, state, {
			loading:null,
			error:action.error,
			message:null
        });
	}
	return state;
}