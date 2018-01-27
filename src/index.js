import { Component, render } from "preact";
import { Motion, spring } from "react-motion";
import Note from "./note";
import CustomDragLayer from "./CustomDragLayer"
import { DragDropContext } from "preact-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./styles.css";

@DragDropContext(HTML5Backend)
class App extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.state = {
      cards: [
        {
          id: 1,
          order: 0,
          text: "Item One"
        },
        {
          id: 2,
          order: 1,
          text: "Item Two"
        },
        {
          id: 3,
          order: 2,
          text: "Item Three"
        }        
      ]
    };
  }

  refresh(dragId,hoverId) {
    // console.log(this.state);

    const { cards } = this.state;
    const dragIndex = cards.findIndex((el) => el.id === dragId);
    const hoverIndex = cards.findIndex((el) => el.id === hoverId);
    const dragCardOrder = cards[dragIndex].order;
    const hoverCardOrder = cards[hoverIndex].order;
    
    cards[dragIndex].order = hoverCardOrder;
    cards[hoverIndex].order = dragCardOrder;

    // cards[0].order = 1;
    // cards[1].order = 0;
    this.setState({});
  }
  render() {
    const { cards } = this.state;
    return (
      <div>
        {cards.map((c, i) => (
          <Motion
            key={i}
            style={{
              y: spring(c.order * 100, { stiffness: 500, damping: 25 })
            }}
          >
            {({ y }) => (
              <Note
                id = {c.id}
                order = {c.order}
                refresh= {this.refresh}
                style={{
                  // 'transform: "translate3d(0, " + y + "px, 0) rotate("+y+"deg)"
                  transform: "translate3d(0, " + y + "px, 0)"

                  // transform: "rotate(40)"
                }}
              ></Note>
            )}
          </Motion>
        ))}
        <CustomDragLayer/>
      </div>
      
    );
  }
}

render(<App />, document.getElementById("root"));
