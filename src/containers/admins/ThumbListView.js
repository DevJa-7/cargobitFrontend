import React, { Component } from "react";
import { Card, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { injectIntl } from "react-intl";

class ThumbListView extends Component {
  constructor(props) {
    super();
    this.state = {
      dropdownSplitOpen: false,
    };
  }

  toggleSplit =()=> {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  render() {
    const {
      admin,
      isSelect,
      onCheckItem
    } = this.props;

    const { dropdownSplitOpen } = this.state;
    return (
      <Colxx xxs="12" key={admin.id} className="mb-3">
        <Card
          onClick={event => onCheckItem(event, admin.id)}
          className={classnames("d-flex flex-row", {
            active: isSelect
          })}
        >
          <NavLink to={`?p=${admin.id}`} className="d-flex">
            <img
              alt={admin.name}
              src={admin.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${admin.id}`} className="w-20 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {admin.name}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-20 w-sm-100">
                {admin.email}
              </p>
              <p className="mb-1 text-muted text-small w-20 w-sm-100">
                {admin.accountType}
              </p>
              <p className="mb-1 text-muted text-small w-20 w-sm-100">
                {admin.createDate}
              </p>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <ButtonDropdown
                isOpen={dropdownSplitOpen}
                toggle={this.toggleSplit}>
                <DropdownToggle caret color="primary" size="xs">
                  <IntlMessages id="admin.action" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <IntlMessages id="admin.delete" />
                  </DropdownItem>
                  <DropdownItem>
                    <IntlMessages id="admin.edit" />
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </div>
        </Card>
      </Colxx>
    );
  }
}

export default injectIntl(ThumbListView);
