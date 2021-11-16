import { USERS } from "./mock/Users"

import React from "react"
import TextInput from "./components/TextInput"
import FilteredList from "./components/FilteredList"

import "./App.css"

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: USERS,
      value: "",
      scrollY: 0,
      unmountList: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onUnmountList = this.onUnmountList.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.scrollY = React.createRef()
  }

  onChange(value) {
    this.setState({ value })
  }

  onUnmountList() {
    this.setState((pState) => ({ unmountList: !pState.unmountList }))
  }

  handleScroll() {
    this.scrollY.current = window.scrollY
    console.log(this.scrollY)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  render() {
    const { users, value, unmountList } = this.state

    return (
      <div className="App">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextInput
            info="This input has been focused"
            value={value}
            onChange={this.onChange}
          />
          <button style={{ width: 100 }} onClick={this.onUnmountList}>
            {this.state.unmountList ? "mount" : "unmount"} list
          </button>
        </div>
        {!unmountList && <FilteredList list={users} filterText={value} />}
      </div>
    )
  }
}
