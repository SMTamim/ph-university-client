import { Button, Modal, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TResponseRedux, TStatus, TStudentTableData } from "../../../../../types";
import { useChangeUserStatusMutation, useGetAllStudentsQuery } from "../../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";



const ViewStudents = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const { data: studentsData, isLoading, isFetching, refetch } = useGetAllStudentsQuery([
        { name: 'limit', value: '3' },
        { name: 'page', value: page },
        { name: 'sort', value: 'id' },
        ...params
    ]);

    const [changeUserStatus] = useChangeUserStatusMutation()

    const tableData: TStudentTableData[] = studentsData?.data?.map(({ _id, id, fullName, email, contactNo, user }) => ({
        key: _id,
        id,
        fullName: fullName,
        email,
        contactNo,
        status: user.status,
        userId: user._id,
    })) || [];

    const metaData = studentsData?.meta;

    const onChange: TableProps<TStudentTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === 'filter') {
            const queryParams: TQueryParam[] = [];

            filters.fullName?.forEach((value) => {
                queryParams.push({ name: 'fullName', value });
            });
            filters.year?.forEach((value) => {
                queryParams.push({ name: 'year', value });
            });
            setParams(queryParams);
        }
    };

    const [modal, contextHolder] = Modal.useModal();


    const columns: TableColumnsType<TStudentTableData> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Contact No',
            dataIndex: 'contactNo',
        },
        {
            title: 'Action',
            render: (item: TStudentTableData) => {
                const newStatus: TStatus = item.status === 'blocked' ? 'in-progress' : 'blocked';
                const statusText = item.status === 'blocked' ? 'Unblock' : 'Block'

                return (<Space>
                    <Link to={item.key}>
                        <Button>Details</Button>
                    </Link>
                    <Link to={`update-student/${item.key}`}>
                        <Button>Update</Button>
                    </Link>
                    <Button
                        onClick={async () => {

                            const config = {
                                title: 'Are you sure?',
                                content: (
                                    <>
                                        <p>Student <strong>{item.fullName}</strong> will be {statusText.toLowerCase()}ed!</p>
                                    </>
                                ),
                            };
                            const confirmed = await modal.confirm(config);
                            if (confirmed) {
                                const loadingToast = toast.loading('Changing Status...');
                                try {
                                    const statusData = { status: newStatus, userId: item.userId };
                                    const res = await changeUserStatus(statusData) as TResponseRedux<null>;

                                    if (res.error) {
                                        toast.error(res.error?.data.message || "Some error occurred while changing status", { id: loadingToast });
                                    } else {
                                        toast.success(`Successfully change status to ${statusData.status}!`, { id: loadingToast })
                                        await refetch();
                                    }
                                } catch (err) {
                                    console.log(err);
                                    toast.error("Something went wrong!", { id: loadingToast });
                                }
                            }

                        }}
                    >
                        {statusText}
                    </Button>
                </Space>)
            },
            width: '1%',
        }
    ];

    return (
        <>
            {contextHolder}
            <Table<TStudentTableData>
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
                loading={isFetching || isLoading}
                pagination={false}
            />
            <Pagination current={page} total={metaData?.total} pageSize={metaData?.limit} onChange={(newPage) => { setPage(newPage) }} />
        </>
    );
};

export default ViewStudents;