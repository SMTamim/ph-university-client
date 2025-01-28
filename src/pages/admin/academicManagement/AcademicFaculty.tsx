import { Button, Input, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicFacultyTableData } from "../../../../types/academicManagement.type";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement";
import { useState } from "react";
import { TQueryParam } from "../../../../types";
import { FaSearch } from "react-icons/fa";

const AcademicFaculty = () => {

    const columns: TableColumnsType<TAcademicFacultyTableData> = [
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
    ];

    const [params, setParams] = useState<TQueryParam[]>([]);

    const { data, isLoading, isFetching } = useGetAllAcademicFacultyQuery(params)
    const tableData = data?.data?.map(({ _id, name }) => ({
        key: _id,
        name
    }))

    const onChange: TableProps<TAcademicFacultyTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === 'filter'){
            const queryParams: TQueryParam[] = [];
            filters.name?.forEach((value) => {
                queryParams.push({name:'name', value: value})
            })
            setParams(queryParams);
        }
    };
    return (
        <Table<TAcademicFacultyTableData>
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
            loading={isFetching || isLoading}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    );
};

export default AcademicFaculty;