import './Popover.css';

export const Popover = function(props) {

    return (
        <div className="popover">
            {props.children}
        </div>
    )
}

export const PopoverContent = function(props) {
    return <>
        <div className="popover_bridge"/>
        {
            !props.hidden && <div className="popover_menu">
                {props.children}
             </div>
        }
    </>
}