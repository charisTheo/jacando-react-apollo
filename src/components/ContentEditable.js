import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ContentEditable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            html: this.props.html,
        }
    }

    shouldComponentUpdate = (nextProps) => {
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }
    componentDidUpdate = () => {
        if ( this.props.html !== ReactDOM.findDOMNode(this).innerHTML ) {
           ReactDOM.findDOMNode(this).innerHTML = this.props.html;
        }
    }
    onKeyPress = (e) => {
        if (e.key == 'Enter') {
            this.setState({html: e.target.innerHTML});
            e.target.blur(e);
        }
    }
    componentWillMount() {
        this.setState({html: this.state.html});
    }
    componentDidMount() {
        this.setState({html: this.state.html});
    }
    handleChange = (e) => {
        this.setState({html: e.target.value});
    }
  
    render() {

        return (
            <div 
                id="contentEditable"
                contentEditable
                className={this.props.className}
                onKeyPress={this.onKeyPress}
                onChange={this.handleChange}
                onBlur={(e) => this.props.onUpdate(e.target.innerHTML)}
                dangerouslySetInnerHTML={{__html: this.state.html}}>
            </div>
        );
    }
}

