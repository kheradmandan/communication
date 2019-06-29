import React from 'react';
import {Menu, Input} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import Messages from '../Message';

export default class MenuBar extends React.Component {
    state = {activeItem: 'کارتابل'};

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
    };

    render() {
        const activeItem = this.state.activeItem;
        return <div>
            <Messages/>
            <Menu pointing>
                <Menu.Item active={activeItem === 'کارتابل'} onClick={this.handleItemClick}>
                    <Link to='/'>کارتابل</Link>
                </Menu.Item>
                <Menu.Item active={activeItem === 'افزودن بحث'} onClick={this.handleItemClick}>
                    <Link to='/issue/new'>افزودن بحث</Link>
                </Menu.Item>
                <Menu.Item
                    name='گزارشات'
                    active={activeItem === 'گزارشات'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='تنظیمات'
                    active={activeItem === 'تنظیمات'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='جستجو...'/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    }
}