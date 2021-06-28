import {
    LockOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import { Alert, Space, message, Tabs } from 'antd';
  import React, { useState } from 'react';
  import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
  import { useIntl, connect, FormattedMessage } from 'umi';
  import styles from './index.less';
  import MD5 from 'crypto-js/md5'
  
  const LoginMessage = ({ content }) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
  
  const Regist = (props) => {
    const { userLogin = {}, submitting } = props;
    const { status, type: loginType } = userLogin;
    const [type, setType] = useState('register');
    const intl = useIntl();
  
    const handleSubmit = (values) => {
      const { dispatch } = props;
      if(values.password != undefined){
        values.password = MD5(values.password).toString();
      }
      dispatch({
        type: 'login/regist',
        payload: { ...values, type },
      });
    };
  
    return (
      <div className={styles.main}>
        <ProForm
          submitter={{
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              loading: submitting,
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
          onFinish={(values) => {
            handleSubmit(values);
            return Promise.resolve();
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="register"
              tab={intl.formatMessage({
                id: 'pages.register.accountRegist.tab',
                defaultMessage: 'Account register',
              })}
            />
          </Tabs>

          {status === 'error' && loginType === 'register' && !submitting && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.register.accountRegist.errorMessage',
                defaultMessage: 'account exists',
              })}
            />
          )}
          {type === 'register' && (
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.username.placeholder',
                  defaultMessage: 'Username: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.username.required"
                        defaultMessage="Please enter user name!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.password.placeholder',
                  defaultMessage: 'Password: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.password.required"
                        defaultMessage="Please enter password！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <a
              style={{
                float: 'right',
              }}
            >
            </a>
          </div>
        </ProForm>
      </div>
    );
  };
  
  export default connect(({ regist, loading }) => ({
    userLogin: regist,
    submitting: loading.effects['login/regist'],
  }))(Regist);
  