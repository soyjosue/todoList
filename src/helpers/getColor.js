const getColor = id => {

    switch(id) {
        case 'yellow':
            return '#FFE601';
        case 'orange':
            return '#FF5E01';
        case 'green':
            return '#1FFF01';
        case 'blue':
            return '#01A2FF';
        case 'pink':
            return '#EA01FF';
        case 'red':
            return '#FF0101';
        default: 
            return '#000000';
    }

}

export default getColor;