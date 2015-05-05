'use strict';

var React = require('react-native');
var tweenState = require('react-tween-state'); // Animate header

var NavButton = require('./NavButton');

var {
    StyleSheet,
    Text,
    View
    } = React;

var NavBarContent = React.createClass({

    mixins: [tweenState.Mixin],

    getInitialState: function () {
        return {
            opacity: this.props.willDisappear ? 1 : 0
        };
    },

    componentWillReceiveProps: function ( newProps ) {
        if (newProps.route !== this.props.route) {
            this.setState({
                opacity: this.props.willDisappear ? 1 : 0
            });

            setTimeout(() => {
                this.tweenState('opacity', {
                    easing: tweenState.easingTypes.easeInOutQuad,
                    duration: 200,
                    endValue: this.props.willDisappear ? 0 : 1
                });
            }, 0);
        }
    },

    goBack: function () {
        if (!this.props.willDisappear) {
            this.props.router.pop();
        }
    },

    goForward: function ( route ) {
        this.props.router.push(route);
    },


    render () {
        var transitionStyle = {
            opacity: this.getTweeningValue('opacity'),
        };

        var leftCorner;
        var rightCorner;
        var titleComponent;

        /**
         * Set leftCorner
         * (defaults to "Back"-button for routes with index > 0)
         */
        var leftCornerContent;

        if (this.props.route.leftCorner || this.props.leftCorner) {
            var LeftCorner = this.props.route.leftCorner || this.props.leftCorner;
            leftCornerContent = <LeftCorner router={this.props.router} />;
        } else if (this.props.route.index > 0) {
            leftCornerContent = (
                <NavButton
                    router={this.props.router}
                    onPress={this.goBack}
                    backButtonComponent={this.props.backButtonComponent} />
            );
        }

        leftCorner = (
            <View style={[styles.corner, styles.alignLeft]}>
                {leftCornerContent}
            </View>
        );

        /**
         * Set rightCorner
         */
        var rightCornerContent;

        if (this.props.route.rightCorner || this.props.rightCorner) {
            var RightCorner = this.props.route.rightCorner || this.props.rightCorner;
            rightCornerContent = <RightCorner router={this.props.router} />;
        }

        rightCorner = (
            <View style={[styles.corner, styles.alignRight]}>
                {rightCornerContent}
            </View>
        );

        /**
         * Set title message
         */
        var titleContent;

        if (this.props.route.titleComponent) {
            var TitleComponent = this.props.route.titleComponent;
            titleContent = <TitleComponent router={this.props.router} />;
        } else {
            titleContent = (
                <Text style={[styles.navbarText, this.props.titleStyle]} numberOfLines={1}>
                    {this.props.route.name}
                </Text>
            );
        }

        titleComponent = (
            <View style={{ flex: 4 }}>
                {titleContent}
            </View>
        );

        return (
            <View style={[styles.navbar, this.props.route.headerStyle, transitionStyle]}>
                {leftCorner}
                {titleComponent}
                {rightCorner}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 64, // Default iOS navbar height
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 13
    },
    navbarText: {
        color: 'white',
        fontSize: 17,
        margin: 10,
        marginTop: 14,
        fontWeight: '600',
        textAlign: 'center',
        alignItems: 'center',
    },
    corner: {
        flex: 1,
        justifyContent: 'center',
    },
    alignLeft: {
        alignItems: 'flex-start'
    },
    alignRight: {
        alignItems: 'flex-end'
    },
    buttonTextLeft: {
        marginLeft: 10,
    },
    buttonTextRight: {
        marginRight: 10
    }
});

module.exports = NavBarContent;
