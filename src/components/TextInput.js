import React from "react"
import PropTypes from "prop-types"

export default class TextInput extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      toggleInfo: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleFocusOut = this.handleFocusOut.bind(this)
    this.inputRef = React.createRef()
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  handleFocus() {
    this.setState({ toggleInfo: true })
  }

  handleFocusOut() {
    this.setState({ toggleInfo: false })
  }

  componentDidMount() {
    this.inputRef.current.addEventListener("focus", this.handleFocus)
    this.inputRef.current.addEventListener("focusout", this.handleFocusOut)
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener("focus", this.handleFocus)
    this.inputRef.current.removeEventListener("focusout", this.handleFocusOut)
  }

  render() {
    const { toggleInfo } = this.state
    const { info, value } = this.props

    return (
      <div>
        <input
          style={this.props.style}
          type="text"
          value={value}
          onChange={this.handleChange}
          ref={this.inputRef}
        />
        {toggleInfo && <span>{info}</span>}
      </div>
    )
  }
}
