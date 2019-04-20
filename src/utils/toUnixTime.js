import getMilisecondIn from './getMilli';


let toUnixTime = function(time_now, time_limit, time_unit){
    return time_now + ( parseInt(time_limit ) * getMilisecondIn( time_unit ) )
}

export default toUnixTime;
