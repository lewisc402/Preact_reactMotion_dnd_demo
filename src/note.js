import { Component } from "preact";
// import { Card } from "antd";
import { DragSource } from "preact-dnd";
import { DropTarget } from "preact-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import "./styles.css";

const Types = {
  CARD: "card"
};

const NoteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      order: props.order
    };
  }
};

const NoteTarget = {
  hover(props, monitor, component) {
    const hoverId = props.id;
    const hoverOrder = props.order;
    const dragId = monitor.getItem().id;
    const dragOrder = monitor.getItem().order;
    // console.log("hover: " +hoverId);
    // console.log("drag: " + dragId);

    if (dragId === hoverId) {
      return;
    }
    props.refresh(dragId, hoverId);
  }
};

function collectTarget(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget()
    // You can ask the monitor about the current drag state:
    // isDragging: monitor.isDragging()
  };
}

function collectSource(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage());
  }

  render(props, state) {
    const {
      id,
      order,
      style,
      connectDragSource,
      connectDropTarget,
      refresh,
      isDragging
    } = this.props;
    const opacity = isDragging ? 0.1 : 1;
    const background = isDragging ? "#111333" : "#FFFFFF";
    const text = isDragging ? '': id + ' ' +order;
    return connectDragSource(
      connectDropTarget(
        <div className="Card" style={{ background, opacity, ...style }}>
         {text}
        </div>
      )
    );
  }
}

Note = DragSource(Types.CARD, NoteSource, collectSource)(Note);
Note = DropTarget(Types.CARD, NoteTarget, collectTarget)(Note);

export default Note;
