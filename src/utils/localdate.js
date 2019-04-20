function toLocalDate(unix){
    let t = new Date(unix);

    return t.toLocaleString();
}

export default toLocalDate;