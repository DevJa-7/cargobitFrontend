import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { ContextMenuTrigger, ContextMenu, MenuItem } from "react-contextmenu";

class CalendarEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  handleClick = (e, data) => {
    console.log(data.action);
  }

  render() {
    return (
      <div>
        <ContextMenuTrigger id="some_unique_identifier">
          <div className="well">Right click to see the menu</div>
        </ContextMenuTrigger>
  
        <ContextMenu id="some_unique_identifier">
          <MenuItem data={{action: 'block'}} onClick={this.handleClick}>
            Block Date
          </MenuItem>
          <MenuItem data={{action: 'view'}} onClick={this.handleClick}>
            View Bookings
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
}

export default injectIntl(CalendarEvent);
