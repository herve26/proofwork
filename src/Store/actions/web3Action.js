import { WEB3CONNECT } from './types';
import getWeb3 from "../../utils/getWeb3";

export const web3Connect = () => async dispatch => {
    console.log('web3 action')
    try {
        dispatch({type: WEB3CONNECT, payload: await getWeb3()})
    } catch (error) {
        console.log('not connected')
    }
}