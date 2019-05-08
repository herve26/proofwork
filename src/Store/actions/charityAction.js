import { ADD_CHARITY, FETCH_CHARITIES } from "./types";

export const addCharity = (charity) => async (dispatch,getState) => {
    console.log(getState())
    try{
        let {contract, account } = getState();
    contract = contract.instance;
    account = account.instance;
        await contract.methods.addCharity(charity.name, charity.address).send({from: account[0]})
        dispatch({type: ADD_CHARITY, payload: charity})
    }
    catch(error){
        console.log(error)
    }
}

export const fetchCharities = () => async (dispatch, getState) => {
    try {
        const contract = getState().contract.instance

		let charitiesLen = parseInt(await contract.methods.getCharitiesLength().call())
		let charities = []
		
		for (let index = 0; index < charitiesLen; index++) {
			charities.push(await contract.methods.getCharity(index).call())
        }
        
		let mappedCharities = charities.map((charity) => {
			return {address: charity[0], name: charity[1]}
        })
        
        dispatch({type: FETCH_CHARITIES, payload: mappedCharities})
        
    } catch (error) {
        
    }
}