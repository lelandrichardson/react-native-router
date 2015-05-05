'use strict';

var React = require('react-native');

var NavBarContainer = require('./components/NavBarContainer');

var {
    StyleSheet,
    Navigator,
    StatusBarIOS,
    View,
    } = React;

var Router = React.createClass({

    componentWillMount: function() {
        this.router = {
            push: this.push,
            pop: this.pop,
            replace: this.replace,
            setTitle: this.setTitle
        };
    },

    getInitialState: function () {
        return {
            route: {
                name: null,
                index: null
            },
            didSwitchView: null,
        }
    },

    onWillFocus: function ( route ) {
        this.setState({ route: route });
    },

    pop: function () {
        if (this.state.route.index > 0) {
            this.refs.navigator.pop();
        }
    },

    push: function ( route ) {
        route.index = this.state.route.index + 1 || 1;
        this.refs.navigator.push(route);
    },

    replace: function ( route ) {
        route.index = this.state.route.index;
        this.refs.navigator.replace(route);
    },

    setTitle: function (title) {
        this.setState({
            route: Object.assign(this.state.route, {
                name: title
            })
        });
    },

    renderScene: function ( route, navigator ) {

        var Content = route.component;

        return (
            <View
                style={[styles.container, this.props.bgStyle]}>
                <Content
                    navigator={navigator}
                    router={this.router}
                    {...route.passProps}
                />
            </View>
        );
    },

    render: function () {

        StatusBarIOS.setStyle(1);

        return (
            <Navigator
                ref="navigator"
                initialRoute={this.props.firstRoute}
                navigationBar={
                    <NavBarContainer
                        style={this.props.headerStyle}
                        navigator={navigator}
                        router={this.router}
                        currentRoute={this.state.route}
                        backButtonComponent={this.props.backButtonComponent}
                        rightCorner={this.props.rightCorner}
                        leftCorner={this.props.leftCorner}
                        titleStyle={this.props.titleStyle}
                    />
                    }
                renderScene={this.renderScene}
                onWillFocus={this.onWillFocus}
            />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

module.exports = Router;
