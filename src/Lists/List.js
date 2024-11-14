import React from "react";

 const List = ({ items, resourceType, component: ListItemComponet }) => {
    return (
        <div>
            {items.map((item, index)=><ListItemComponet key={index} {...{[resourceType]:item}}/>)}
        </div>
    )
}

export default List;