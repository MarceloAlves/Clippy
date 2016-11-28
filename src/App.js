import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Clipboard from 'clipboard';
import './App.css';

new Clipboard('button');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    App.context = this;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let clippyStorage = localStorage.clippy
    if(clippyStorage != null) {
      App.context.setState({items: JSON.parse(clippyStorage).items})
    } else {
      App.context.setState({items: []})
    }
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    App.context.setState({items: newItems});
    localStorage.setItem("clippy", JSON.stringify({items: newItems}));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let items = this.state.items
    items.push(document.getElementById("name").value)
    App.context.setState({items: items})
    localStorage.setItem("clippy", JSON.stringify(this.state));
    document.getElementById("name").value = "";
  }

  renderRow = (item, index) => {
    return (
      <li className="list-group-item" key={index}>
        <span className="pull-right">
          <button className="btn btn-xs btn-primary" data-clipboard-target={`#item-${index}`}><i className="fa fa-clipboard"></i></button>
          &nbsp;
          <button className="btn btn-xs btn-danger" onClick={() => this.handleRemove(index)}><i className="fa fa-times"></i></button>
        </span>
        <span id={`item-${index}`}>
          {item}
        </span>
      </li>
    )
  }

  render() {
    let rows = this.state.items.map((item, index) => {
      return this.renderRow(item, index)
    })

    return (
      <div className="container">
        <ul className="list-group">
          <ReactCSSTransitionGroup
          transitionName="itemrow"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {rows}
        </ReactCSSTransitionGroup>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>
            New Item:
            <input id="name" type="text" name="item" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
