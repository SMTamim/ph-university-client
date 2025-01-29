import { useState } from "react";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Input, Table, TableColumnsType, TableProps } from "antd";
import { FaSearch } from "react-icons/fa";
import { TAcademicDepartmentTableData } from "../../../../types/academicManagement.type";
import { TQueryParam } from "../../../../types";



const columns: TableColumnsType<TAcademicDepartmentTableData> = [
    {
        title: 'Name',
        dataIndex: 'name',
        showSorterTooltip: { target: 'full-header' },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder="Search name"
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()} // Trigger filter on Enter key
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        type="primary"
                        onClick={() => confirm()} // Apply filter
                        icon={<FaSearch />}
                        size="small"
                        style={{ width: '45%' }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters?.();
                            confirm();
                        }}
                        size="small"
                        style={{ width: '45%' }}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        ),
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Academic Faculty',
        dataIndex: 'academicFaculty',
    }
];

const AcademicDepartment = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const { data, isLoading, isFetching } = useGetAllAcademicDepartmentQuery(params);
    console.log(data);

    const tableData: TAcademicDepartmentTableData[] = data?.data?.map(academicDepartment => {
        const da = {
            key: academicDepartment._id,
            academicFaculty: academicDepartment.academicFaculty.name,
            name: academicDepartment.name
        };
        console.log(da);
        return da;
    }) || [];

    const onChange: TableProps<TAcademicDepartmentTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === 'filter') {
            const queryParams: TQueryParam[] = [];
            filters.name?.forEach((value) => {
                queryParams.push({ name: 'name', value: value })
            })
            setParams(queryParams);
        }
    };
    return (
        <Table<TAcademicDepartmentTableData>
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
            loading={isFetching || isLoading}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    );
};

export default AcademicDepartment;