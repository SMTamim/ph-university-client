import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TStudentTableData } from "../../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";


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
        title: 'Action',
        render: () => (
            <Space>
                <Button>Update</Button>
                <Button>Details</Button>
                <Button>Block</Button>
            </Space>
        ),
        width: '1%',
    }
];

const ViewStudents = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const { data: studentsData, isLoading, isFetching } = useGetAllStudentsQuery([
        { name: 'limit', value: '3' },
        { name: 'page', value: page },
        { name: 'sort', value: 'id' },
        ...params
    ]);

    const tableData = studentsData?.data?.map(({ _id, id, fullName }) => ({
        key: _id,
        id,
        fullName: fullName,
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


    return (
        <>
            <Table<TStudentTableData>
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
                loading={isFetching || isLoading}
                pagination={false}
            />
            <Pagination current={page} total={metaData?.total} pageSize={metaData?.limit} onChange={(newPage)=>{setPage(newPage)}}/>
        </>
    );
};

export default ViewStudents;