import React, {Component} from 'react'
import {ListView, View} from 'react-native'

class List extends Component {

  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: dataSource.cloneWithRows(props.items),
    }

    this.renderSeparator = this.renderSeparator.bind(this);
  }

  componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.items),
        })
  }

  renderSeparator() {
    return (
      <View style={{height: 1, backgroundColor: 'rgb(128, 128, 128)'}}/>
    )
  }

  render() {
    return (
      <ListView
          dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={this.props.renderItem}
          renderSeparator={this.renderSeparator}/>
     );
  }
}

export default List
