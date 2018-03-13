import * as React from 'react'

import {
  Dimensions,
  Modal,
  ModalProperties,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const {height, width} = Dimensions.get('window')

const PADDING = 8
const BORDER_RADIUS = 5
const FONT_SIZE = 16
const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)'
const OPTION_CONTAINER_HEIGHT = 400

const styles = StyleSheet.create({
  overlayStyle: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  optionContainer: {
    borderRadius: BORDER_RADIUS,
    width: width * 0.8,
    height: OPTION_CONTAINER_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.8)',
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2,
  },

  cancelContainer: {
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 10,
  },

  selectStyle: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: BORDER_RADIUS,
  },

  selectTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: FONT_SIZE,
  },

  cancelStyle: {
    borderRadius: BORDER_RADIUS,
    width: width * 0.8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: PADDING,
  },

  cancelTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: FONT_SIZE,
  },

  optionStyle: {
    padding: PADDING,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  optionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE,
    color: HIGHLIGHT_COLOR,
  },

  sectionStyle: {
    padding: PADDING * 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  sectionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE,
  },
  optionsContainer: {paddingHorizontal: 10},
})

let componentIndex = 0

export interface IProps {
  data: Array<any>
  onChange: (item: any) => void
  onClose: () => void
  initValue: string
  style?: any
  selectStyle?: any
  optionStyle?: any
  optionTextStyle?: any
  sectionStyle?: any
  sectionTextStyle?: any
  cancelStyle?: any
  cancelTextStyle?: any
  overlayStyle?: any
  cancelText?: string
  selectTextStyle?: any
  modalVisible: boolean
}

export default class ModalPicker extends React.Component<IProps> {
  public state: {
    selected: string
    modalVisible: boolean
    transparent: boolean
    animationType: ModalProperties['animationType']
  }

  constructor(props: IProps) {
    super(props)

    this.state = {
      animationType: 'slide',
      modalVisible: true,
      transparent: false,
      selected: 'please select',
    }
  }

  public componentDidMount() {
    this.setState({selected: this.props.initValue})
    this.setState({cancelText: this.props.cancelText})
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.initValue !== this.props.initValue) {
      this.setState({selected: nextProps.initValue})
    }
  }

  public onChange(item: any) {
    this.props.onChange(item)
    this.setState({selected: item.label})
    this.close()
  }

  public close() {
    this.props.onClose()
  }

  public open() {
    this.setState({
      modalVisible: true,
    })
  }

  public renderSection(section: any) {
    return (
      <View
        key={section.key}
        style={[styles.sectionStyle, this.props.sectionStyle]}>
        <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>
          {section.label}
        </Text>
      </View>
    )
  }

  public renderOption(option: any) {
    return (
      <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
        <View style={[styles.optionStyle, this.props.optionStyle]}>
          <Text style={[styles.optionTextStyle, this.props.optionTextStyle]}>
            {option.label}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  public renderOptionList() {
    const options = this.props.data.map(item => {
      if (item.section) {
        return this.renderSection(item)
      } else {
        return this.renderOption(item)
      }
    })

    return (
      <View
        key={'modalPicker' + componentIndex++}
        style={[styles.overlayStyle, this.props.overlayStyle]}>
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps>
            <View style={styles.optionsContainer}>{options}</View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this.close}>
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text
                style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>
                {this.props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  public renderChildren() {
    if (this.props.children) {
      return this.props.children
    }
    return (
      <View style={[styles.selectStyle, this.props.selectStyle]}>
        <Text style={[styles.selectTextStyle, this.props.selectTextStyle]}>
          {this.state.selected}
        </Text>
      </View>
    )
  }

  public render() {
    return (
      <View style={this.props.style}>
        <Modal
          animationType={this.state.animationType}
          onRequestClose={this.close}
          transparent
          visible={this.props.modalVisible}>
          {this.renderOptionList()}
        </Modal>
      </View>
    )
  }
}
