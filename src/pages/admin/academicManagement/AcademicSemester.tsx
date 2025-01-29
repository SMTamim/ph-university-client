import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemesterTableData } from "../../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../../types";

const currentYear = new Date().getFullYear();
const yearFilters = [0, 1, 2, 3, 4].map((year) => ({
    value: (currentYear + year).toString(),
    text: (currentYear + year).toString(),
}))


const columns: TableColumnsType<TAcademicSemesterTableData> = [
    {
        title: 'Name',
        dataIndex: 'name',
        showSorterTooltip: { target: 'full-header' },
        filters: [
            {
                text: 'Autumn',
                value: 'Autumn',
            },
            {
                text: 'Fall',
                value: 'Fall',
            },
            {
                text: 'Summer',
                value: 'Summer',
            },
        ],
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Year',
        dataIndex: 'year',
        filters: yearFilters,
    },
    {
        title: 'Start Month',
        dataIndex: 'startMonth',
    },
    {
        title: 'End Month',
        dataIndex: 'endMonth',
    },
    {
        title: 'Action',
        render: () => <div><Button>Update</Button></div>
    }
];

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const { data: semesterData, isLoading, isFetching } = useGetAllAcademicSemestersQuery(params);

    const tableData = semesterData?.data?.map(({ _id, name, year, startMonth, endMonth }) => ({
        key: _id, name, year, startMonth, endMonth
    }));

    const onChange: TableProps<TAcademicSemesterTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === 'filter') {
            const queryParams: TQueryParam[] = [];

            filters.name?.forEach((value) => {
                queryParams.push({ name: 'name', value });
            });
            filters.year?.forEach((value) => {
                queryParams.push({ name: 'year', value });
            });
            setParams(queryParams);
        }
    };


    return (
        <Table<TAcademicSemesterTableData>
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
            loading={isFetching || isLoading}
        />
    );
};

export default AcademicSemester;