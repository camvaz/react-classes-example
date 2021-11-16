import PropTypes from "prop-types"
import React from "react"

export default class ListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { clicked: false }
    this.itemRef = React.createRef()
    this.handleRef = this.handleRef.bind(this)
  }
  
  handleRef() {
    this.itemRef.current.style.backgroundColor = this.state.clicked
      ? "#000"
      : "#fff"
    this.setState((state) => ({ clicked: !state.clicked }))
  }

  componentDidMount() {
    this.itemRef.current.addEventListener("click", this.handleRef)
  }

  componentWillUnmount() {
    this.itemRef.current.removeEventListener("click", this.handleRef)
  }

  render() {
    const { item } = this.props

    return (
      <li ref={this.itemRef}>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </li>
    )
  }
}
