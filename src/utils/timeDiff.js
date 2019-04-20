let timeDiff = function(start_date, future_unix_date){
    return (Date.now() - start_date) * 100 / (future_unix_date - start_date);
}

export default timeDiff;