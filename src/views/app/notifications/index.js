import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import NotificationList from '../../../containers/notifications/NotificationList';
import ListPageHeading from "../../../containers/notifications/ListPageHeading";
import AddNewModal from "../../../containers/notifications/AddNewModal";

class Administrators extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    }
  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    const {
      modalOpen,
      categories
    } = this.state;
    const { match } = this.props;
    return (
      <Fragment>
        <div className="disable-text-selection">
          <ListPageHeading
            heading="notification.default"
            match={match}
            toggleModal={this.toggleModal}
          />
          <AddNewModal
            modalOpen={modalOpen}
            toggleModal={this.toggleModal}
            categories={categories}
          />
          <Row>
            <Colxx xl="12" lg="12" className="mb-4">
              <NotificationList />
            </Colxx>
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default injectIntl(Administrators);
