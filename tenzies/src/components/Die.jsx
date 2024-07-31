export function Die(props){
    const style = {
        backgroundColor : props.isHeld ? '#59E391' : 'white'
    } 
    return(
        <div className="die--face"
        onClick={props.holdDice}
        style={style}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}