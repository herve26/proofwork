// Return the number of millisecond second depending on the format
let getMilisecondIn = function(format){
    switch (format) {
        case "minutes":
            return 60 * 1000;
        case "hours":
            return 3600 * 1000;
        case "days":
            return 3600 * 1000 * 24;
        case "months":
            return 3600 * 1000 * 24 * 30;
    }
}

export default getMilisecondIn;