import { GET_ACCOUNT } from './types';

export const getAccount = (web3) => async dispatch => {
    try {
        dispatch({type: GET_ACCOUNT, payload: await web3.eth.getAccounts()})
    } catch (error) {
        console.log('not connected')
    }
}