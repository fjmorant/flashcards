import * as React from 'react'
import {ListView, View} from 'react-native'

export interface IProps {
  renderItem: (item: any) => React.ReactElement<any>
  items: Array<any>
}

class List extends React.Component<IProps> {
  public state: {
    dataSource: any
  }

  constructor(props: IProps) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })

    this.state = {
      dataSource: dataSource.cloneWithRows(props.items),
    }

    this.renderSeparator = this.renderSeparator.bind(this)
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.items),
    })
  }

  public renderSeparator() {
    return <View style={{height: 1, backgroundColor: 'rgb(128, 128, 128)'}} />
  }

  public render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={this.props.renderItem}
        renderSeparator={this.renderSeparator}
      />
    )
  }
}

export default List
