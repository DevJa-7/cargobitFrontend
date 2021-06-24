import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Card, CardBody, CardTitle } from "reactstrap";
import {Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { CalendarToolbar } from "../../components/CalendarToolbar";
import IntlMessages from "../../helpers/IntlMessages";
import data from "../../data/events";
import CalendarEvent from "./CalendarEvent";

import { getDirection } from "../../helpers/Utils";

const localizer = momentLocalizer(moment)

class CalendarCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  selecteDate(data) {
    console.log('select date===', data)
  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="dashboard.calendar" />
          </CardTitle>
          <Calendar
            localizer={localizer}
            style={{ minHeight: "500px" }}
            events={data}
            rtl={getDirection().isRtl}
            views={["month"]}
            onSelectEvent={this.selecteDate}
            components={{
              event: CalendarEvent,
              toolbar: CalendarToolbar
            }}
          />
        </CardBody>
      </Card>
    )
  } 
}

export default injectIntl(CalendarCard);
