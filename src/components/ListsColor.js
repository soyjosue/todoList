const ListsColor = ({ handlerPutClass, activeBefore, setActiveBefore }) => (
    <div className='container-color'>

        <div
            className="block-div"
            onClick={e => handlerPutClass(e, activeBefore, setActiveBefore)}
            id="yellow"
        >
            <div
                style={{ backgroundColor: '#FFE601' }}
                className="block"
            ></div>
        </div>

        <div
            className="block-div"
            onClick={e => handlerPutClass(e, activeBefore, setActiveBefore)}
            id="orange"
        >
            <div
                style={{ backgroundColor: '#FF5E01' }}
                className="block"
            ></div>
        </div>

        <div
            className="block-div"
            onClick={e => handlerPutClass(e, activeBefore, setActiveBefore)}
            id="green"
        >
            <div
                style={{ backgroundColor: '#1FFF01' }}
                className="block"
            ></div>
        </div>

        <div
            className="block-div"
            onClick={e => handlerPutClass(e, activeBefore, setActiveBefore)}
            id="blue"
        >
            <div
                style={{ backgroundColor: '#01A2FF' }}
                className="block"
            ></div>
        </div>

        <div
            className="block-div"
            onClick={e => handlerPutClass(e, activeBefore, setActiveBefore)}
            id="pink"
        >
            <div
                style={{ backgroundColor: '#EA01FF' }}
                className="block"
            ></div>
        </div>

        <div
            className="block-div"
            onClick={e => handlerPutClass(e, activeBefore, setActiveBefore)}
            id="red"
        >
            <div
                style={{ backgroundColor: '#FF0101' }}
                className="block"
            ></div>
        </div>
    </div>
);


export default ListsColor;