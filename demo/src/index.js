import React from 'react'
import {render, findDOMNode} from 'react-dom'
import './index.css';

import {createElementQueryContainer} from '../../src/ElementQueryContainer'

class Test extends React.Component {
    render() {
        const {small, medium, large} = this.props.queries;

        if (small) {
            return <div className="test-panel small">Small</div>;
        } else if (medium) {
            return <div className="test-panel medium">Medium</div>;
        } else if (large) {
            return <div className="test-panel large">Large</div>;
        }
    }
}

const queries = {
    small: {maxWidth: 200},
    medium: {minWidth: 201, maxWidth: 400},
    large: {minWidth: 401}
};
let WrappedTest = createElementQueryContainer(Test, queries);

class Demo extends React.Component {
    render() {
        return <div>
            <h1>react-element-query Demo</h1>
            <div className="test-container" style={{width: 200}}>
                <WrappedTest ref="foo"/>
            </div>
        </div>
    }
    
    componentDidMount() {
        // console.log(findDOMNode(this.refs.foo));
    }
}

render(<Demo/>, document.querySelector('#demo'));
