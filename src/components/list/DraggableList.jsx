import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './draggable-list.css'

import DraggableListItem from './DraggableListItem'

const DraggableList = props => {

    const [data, setdata] = useState(props.data);

    const [dragStartIndex, setdragStartIndex] = useState(null);

    // get index of draged item
    const onDragStart = (index) => setdragStartIndex(index)

    // update list when item dropped
    const onDrop = (dropIndex) => {
        // get draged item
        const dragItem = data[dragStartIndex]

        // delete draged item in list
        let list = [...data]
        list.splice(dragStartIndex, 1)

        // update list
        if (dragStartIndex < dropIndex) {
            setdata([
                ...list.slice(0, dropIndex - 1),
                dragItem,
                ...list.slice(dropIndex - 1, list.length)
            ])
        } else {
            setdata([
                ...list.slice(0, dropIndex),
                dragItem,
                ...list.slice(dropIndex, list.length)
            ])
        }
    }

    return (
        <ul className="draggable-list">
            {
                data.map((item, index) => (
                    <DraggableListItem
                        key={index}
                        index={index}
                        onDragStart={(index) => onDragStart(index)}
                        onDrop={(index) => onDrop(index)}
                    >
                        {
                            props.renderItemContent(item)
                        }
                    </DraggableListItem>
                ))
            }
            {/*
                add last item so you can drag item to last position
                last item dont need onDragStart because it can not be draged
            */}
            <DraggableListItem
                key={data.length}
                index={data.length}
                draggale={false}
                onDrop={(index) => onDrop(index)}
            />
        </ul>
    )
}

DraggableList.propTypes = {
    data: PropTypes.array,
    renderItemContent: PropTypes.func
}

export default DraggableList
