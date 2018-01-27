import { Component } from 'preact';
import "./styles.css";

const styles = {
  display: 'inline-block',
  transform: 'rotate(20deg)',
  WebkitTransform: 'rotate(20deg)',
}

export default class CardDragPreview extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Card" style={styles}>
       kkk
      </div>
    )
  }
}