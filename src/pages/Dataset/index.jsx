import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';

export default () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.dataset.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <FormattedMessage id="pages.dataset.Component" defaultMessage="数据管理" />{' '}
          <a
            href="https://github.com/UniversalDataTool/react-image-annotate"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.dataset.link" defaultMessage="Welcome" />
          </a>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
