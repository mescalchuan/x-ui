import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';

export const DRAWER_POSITION = {
    LEFT: 'left',
    RIGHT: 'right'
}

export default class DrawerLayout extends Component {
    static defaultProps = {
        renderNavigationView: () => {},
        drawerPosition: DRAWER_POSITION.LEFT,
        onDrawerOpen: () => {},
        onDrawerClose: () => {}
    }
    static propTypes = {
        renderNavigationView: PropTypes.func,
        drawerPosition: PropTypes.string,
        onDrawerOpen: PropTypes.func,
        onDrawerClose: PropTypes.func
    }
    constructor(props){
        super(props);
        this.state = {
            openValue: 0,
            drawerHasShown: false
        }
    }

    openDrawer() {
        this.setState({
            drawerHasShown: true
        });
        this.props.onDrawerOpen && this.props.onDrawerOpen();
    }

    closeDrawer() {
        this.setState({
            drawerHasShown: false
        });
        this.props.onDrawerClose && this.props.onDrawerClose();
    }

    render() {
        return (
            <div className = {`x-drawer-container${this.state.drawerHasShown ? ' x-drawer-active' : ''}`} >
                <div className = {'x-drawer-mask'} onClick = {() => this.closeDrawer()} ></div>
                <div className = {`x-drawer-view x-drawer-view-${this.props.drawerPosition === DRAWER_POSITION.LEFT ? 'left' : 'right'}`} >
                    {this.props.renderNavigationView()}
                </div>
            </div>
        );
    }
}