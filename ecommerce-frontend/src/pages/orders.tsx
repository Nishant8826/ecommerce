import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";

type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
};

const column: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];

const Orders = () => {
    const [rows, setRows] = useState<DataType[]>([
        {
            _id: 'sdcsdkjcgsed7846r2783dy2837d',
            amount: 123,
            quantity: 7,
            discount: 12,
            status: <span className="red">Processing</span>,
            action: <Link to={`/order/sdcsdkjcgsed7846r2783dy2837d`}>View</Link>,
        }
    ]);

    const Table = TableHOC<DataType>(
        column,
        rows,
        "dashboard-product-box",
        "Orders",
        rows.length > 6
    )();
    return (
        <div className="container">
            <h1>My Orders</h1>
            {Table}
        </div>
    );
};

export default Orders;