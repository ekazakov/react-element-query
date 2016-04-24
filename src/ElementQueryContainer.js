import React, {Component} from 'react';

const {NEGATIVE_INFINITY, POSITIVE_INFINITY} = Number;

function calcQueriesMap(queries, {clientWidth, clientHeight}) {
     return Object.keys(queries).reduce((result, key) => {
        const { minWidth = NEGATIVE_INFINITY, maxWidth = POSITIVE_INFINITY } = queries[key];
        result[key] = minWidth <= clientWidth && clientWidth <= maxWidth;
        return result;
    }, {});
}

function isQueriesMapsEquals(mapA, mapB) {
    return !Object.keys(mapA).some(query => mapA[query] !== mapB[query]);
}

const iframeStyles = {
    width: '100%',
    height: 0,
    border: 'none',
    position: 'absolute'
};

export function createElementQueryContainer(Component, queries) {
    return class ElementQueryContainer extends Component {
        state = {queriesMap: null};

        onFrameMounted = (iframe) => {
            const {documentElement} = iframe.contentDocument;
            const queriesMap = calcQueriesMap(queries, documentElement);

            this.setState({queriesMap});

            iframe.contentWindow.onresize = () => {
                const queriesMap = calcQueriesMap(queries, documentElement);

                if (this.state.queriesMap == null || !isQueriesMapsEquals(this.state.queriesMap, queriesMap)) {
                    this.setState({queriesMap})
                }
            };
        };

        render() {
            const {containerStyle, containerClassName, ...restProps} = this.props;

            return <div style={{position: 'relative'}} className={containerClassName}>
                <iframe style={iframeStyles} ref={this.onFrameMounted}/>
                {this.state.queriesMap != null ? <Component {...restProps} queries={this.state.queriesMap} /> : null}
            </div>;
        }
    }
}
