import { GET_CONTRACT } from './types';
import TasksContract from "../../contracts/Tasks.json";

export const getContract = (web3) => async dispatch => {
    try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = TasksContract.networks[networkId];
        const instance = new web3.eth.Contract(
            TasksContract.abi,
            deployedNetwork && deployedNetwork.address,
        );
        dispatch({type: GET_CONTRACT, payload: instance})
    } catch (error) {
        console.log('not connected')
    }
}