import React from 'react'
import PropTypes from 'prop-types'

class TogglableTextbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }
        const blogStyle = {
            padding: 5,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }

        return (
            <div style={blogStyle} className="p-2" key={this.props.id}>
                <div style={hideWhenVisible}>
                    <div onClick={this.toggleVisibility}>{this.props.header}</div>
                </div>
                <div style={showWhenVisible}>
                    <div onClick={this.toggleVisibility}>{this.props.children}
                    <button type="submit" className="btn">like</button>
                    </div>
                </div>
            </div>
        )
    }
}

TogglableTextbox.propTypes = {
    header: PropTypes.string.isRequired
}

export default TogglableTextbox