import React from 'react';
import {Menu, Input} from "semantic-ui-react";

export default class MenuBar extends React.Component {
    state = {activeItem: 'کارتابل'};

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
    };

    render() {
        const activeItem = this.state.activeItem;
        return <div>
            <Menu pointing>
                <Menu.Item name='کارتابل' active={activeItem === 'کارتابل'} onClick={this.handleItemClick}/>
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