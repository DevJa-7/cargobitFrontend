import React, { Component } from "react";
import { ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { injectIntl } from "react-intl";

class ActionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSplitOpen: false,
    };
  }

  toggleSplit =()=> {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  componentDidMount(){

  }

  render() {
    const { dropdownSplitOpen } = this.state;
    return (
      <div className="float-md-right pt-1">
        <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
          <ButtonDropdown 
            isOpen={dropdownSplitOpen}
            toggle={this.toggleSplit}>
            <DropdownToggle caret color="primary" size="xs">
              <IntlMessages id="notification.action" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <IntlMessages id="notification.view" />
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    );
  }
}

export default injectIntl(ActionList);
