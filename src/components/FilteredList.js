import React from "react"
import PropTypes from "prop-types"
import { filter, isEqual } from "lodash"

import ListItem from "./ListItem"

function filterUser(users, filterText) {
  return filter(users, (item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  )
}

export default class FilteredList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    filterText: PropTypes.string.isRequired,
  }

  state = {
    filteredList: filterUser(this.props.list, this.props.filterText),
  }

  componentDidUpdate(prevProps) {
    const { filterText, list } = this.props

    !isEqual(prevProps.filterText, filterText) &&
      this.setState({
        filteredList: filterUser(list, filterText),
      })
  }

  render() {
    const { filteredList } = this.state

    return (
      <React.Fragment>
        <h1>Filtered List</h1>
        <ul>
          {filteredList.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </ul>
      </React.Fragment>
    )
  }
}
