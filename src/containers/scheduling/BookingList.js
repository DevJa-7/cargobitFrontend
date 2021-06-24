import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";

import IntlMessages from "../../helpers/IntlMessages";
import Pagination from "../../components/DatatablePagination";
import ActionList from "./ActionList";

import data from "../../data/booking";

const BookingList = ({title="scheduling.bookings"}) => {
  const columns = [
    {
      Header: "User Name",
      accessor: "userName",
      Cell: props => <p className="list-item-heading">{props.value}</p>
    },
    {
      Header: "Slot",
      accessor: "slot",
      Cell: props => <p className="text-muted">{props.value}</p>
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: props => <p className="text-muted">{props.value}</p>
    },
    {
      Header: "",
      accessor: "id",
      Cell: props => <ActionList />
    }
  ];
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          <IntlMessages id={title} />
        </CardTitle>
        <ReactTable
          defaultPageSize={5}
          data={data.slice(0, 12)}
          columns={columns}
          minRows={0}
          showPageJump={false}
          showPageSizeOptions={false}
          PaginationComponent={Pagination}
        />
      </CardBody>
    </Card>
  );
};
export default BookingList;
