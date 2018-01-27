import { Component } from "preact";
import { DragLayer } from "preact-dnd";
import CardDragPreview from "./CardDragPreview";
import "./styles.css";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "120px",
  height: "50px"
};

function getItemStyles(props) {
  const { initialOffset, currentOffset, co } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }
  let { x, y } = currentOffset;
  // let { x, y } = co

  // console.log(x + " " + y);
  // if (props.snapToGrid) {
  //   x -= initialOffset.x
  //   y -= initialOffset.y
  //     ;[x, y] = snapToGrid(x, y)
  //   x += initialOffset.x
  //   y += initialOffset.y
  // }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform
  };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  co: monitor.getClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class CustomDragLayer extends Component {
  renderItem(type, item) {
    switch (type) {
      case "card":
        return <CardDragPreview />;
      default:
        return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          <CardDragPreview />
        </div>
      </div>
    );
  }
}
