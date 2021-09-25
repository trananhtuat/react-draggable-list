import React, { useRef } from 'react'
import PropTypes from 'prop-types'

const DraggableListItem = props => {

    const itemRef = useRef(null)

    const onDragStart = (e) => {
        
        // remove default drag ghost
        e.dataTransfer.effectedAllowed = 'move'
        e.dataTransfer.setDragImage(e.target, 50000, 50000)

        // custom drag ghost
        let ghostNode = e.target.cloneNode(true)

        ghostNode.style.position = "absolute"

        // show ghost add mouse pointer position
        ghostNode.style.top = (e.pageY - e.target.offsetHeight /2) + 'px'
        ghostNode.style.left = (e.pageX - e.target.offsetWidth /2) + 'px'

        // add width height to ghost node
        ghostNode.style.height = e.target.offsetHeight + 'px'
        ghostNode.style.width = e.target.offsetWidth + 'px'

        // add some style
        ghostNode.style.opacity = '0.8'
        ghostNode.style.pointerEvents = 'none'

        // add id
        ghostNode.id = 'ghostNode'

        document.body.prepend(ghostNode)

        // identify selected item
        itemRef.current.classList.add('dragstart')

        if (props.onDragStart) {
            props.onDragStart(props.index)
        }
    }

    // event when dragging
    const onDrag = (e) => {
        // move ghost node with mouse
        let ghostNode = document.querySelector('#ghostNode')
        ghostNode.style.top = (e.pageY - e.target.offsetHeight /2) + 'px'
        ghostNode.style.left = (e.pageX - e.target.offsetWidth /2) + 'px'
    }

    // event when drag end
    const onDragEnd = () => {
        // remove ghost node
        document.querySelector('#ghostNode').remove()
        // remove selected item style
        itemRef.current.classList.remove('dragstart')
    }

    // event when drag over item
    const onDragEnter = () => itemRef.current.classList.add('dragover')

    // event when drag leave item
    const onDragLeave = () => itemRef.current.classList.remove('dragover')

    // add event for item can drop
    const onDragOver = (e) => e.preventDefault()

    // event when drop
    const onDrop = () => {
        itemRef.current.classList.remove('dragover')
        props.onDrop(props.index)
    }

    return (
        <li
            ref={itemRef}
            className="draggable-list__item"
            draggable={props.draggable !== undefined ? props.draggable : true}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {props.children}
        </li>
    )
}

DraggableListItem.propTypes = {
    draggable: PropTypes.bool,
    index: PropTypes.number,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func
}

export default DraggableListItem
