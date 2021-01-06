const handlerPutClass = (e, activeBefore, setActiveBefore) => {

    const { className } = e.target;

    if (className === 'block-div' || className === 'block-div active') return;

    if (activeBefore) {
        document.querySelector(`#${activeBefore}`).className = "block-div";
    }

    const { id } = e.target.parentElement;

    if (!(id === activeBefore)) {
        e.target.parentElement.className = 'block-div active';
        setActiveBefore(e.target.parentElement.id);
    } else {
        setActiveBefore(null);
    }

}

export default handlerPutClass;