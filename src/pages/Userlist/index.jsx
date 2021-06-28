import React, {useRef} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Avatar, Switch} from 'antd';
import ProTable from '@ant-design/pro-table';
import { getUsers } from '@/services/user'

export default () => {
  const actionRef = useRef();
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_, record) => <Avatar size={48} src={record.avatar_url} icon={<UserOutlined />} />
    },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'useremail',
    },
    {
      title: '是否禁用',
      dataIndex: 'permission',
      valueEnum: {
        all: {text: '全部', status: 'Default'},
        permission: {text:'启用', status: 'Permission'},
        forbidden: {text:'禁用', status: 'Forbbiden'},
      },
      render: (_, record) => <Switch checkedChildren="启用" unCheckedChildren="禁用" 
        defaultChecked = {record.permission === 0}
        onChange ={ () => {} }
      />
    },
    {
      title: '创建日期',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '创建日期',
      dataIndex: 'create_time',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value, any) => ({startCreateDate: value[0], endCreateDate: value[1]}),
      }
    },
    {
      title: '上次登录时间',
      dataIndex: 'last_login_time',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '上次登录时间',
      dataIndex: 'last_login_time',
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value, any) => ({startLoginTime: value[0], endLoginTime: value[1]}),
      }
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => <a onChange={() => {} }>编辑</a>
    },
  ];

  return (
    <PageContainer>
      <ProTable columns={columns} actionRef={actionRef}
        request={async (params = {}, sort, filter) => getUsers(params)}
        editable={{
        type: 'multiple',}} 
        rowKey="id" 
        search={{labelWidth: 'auto',}} 
        form={{}} 
        pagination={{pageSize: 5,}} 
        dateFormatter="string" headerTitle="用户列表" 
        toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}/>
    </PageContainer>
  );
};
