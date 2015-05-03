'use strict';

var React = require('react-native');

var BlurView = require('react-native-blur').BlurView;

var NavBarContent = require('./NavBarContent');

var {
    StyleSheet,
    View
    } = React;

var NavBarContainer = React.createClass({

    getInitialState: function () {
        return {
            backButtonOpacity: 0,
            previousRoute: {} // Keep previousRoute for smooth transitions
        };
    },

    componentWillReceiveProps: function ( newProps ) {
        if (this.props && this.props.currentRoute.index !== newProps.currentRoute.index) {
            this.setState({
                previousRoute: this.props.currentRoute
            });
        }
    },

    goBack: function () {
        this.props.router.pop();
    },

    goForward: function ( route ) {
        this.props.router.push(route);
    },

    // We render both the current and the previous navbar (for animation)
    render: function () {
        return (
            <BlurView blurType="light" style={[styles.navbarContainer, this.props.style]}>
                <NavBarContent
                    route={this.state.previousRoute}
                    backButtonComponent={this.props.backButtonComponent}
                    rightCorner={this.props.rightCorner}
                    titleStyle={this.props.titleStyle}
                    willDisappear="true"
                    router={this.props.router}
                />
                <NavBarContent
                    route={this.props.currentRoute}
                    backButtonComponent={this.props.backButtonComponent}
                    rightCorner={this.props.rightCorner}
                    titleStyle={this.props.titleStyle}
                    goBack={this.goBack}
                    goForward={this.goForward}
                    router={this.props.router}
                />
            </BlurView>
        );
    }
});

var styles = StyleSheet.create({
    navbarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
    }
});

module.exports = NavBarContainer;
