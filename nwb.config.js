module.exports = {
    type: 'react-component',
    babel: {
        stage: 0
    },
    build: {
        externals: {
            'react': 'React'
        },
        global: '',
        jsNext: true,
        umd: true
    }
};
