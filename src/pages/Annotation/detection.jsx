import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ReactImageAnnotate from "react-image-annotate"
import {saveAnnotaions} from '@/services/annotation'
import { message } from 'antd';

const Annotation = () => {
  const requireContext = require.context("../../../images", false, /^\.\/.*\.png$/);
  const Imgs = requireContext.keys().map(requireContext);

  var array = new Array();

  for (let i = 0; i < Imgs.length; i++){
    var obj = new Object();
    obj.src = Imgs[i];
    obj.name = "hot dog";
    obj.regions = [];
    obj.annotator = localStorage.getItem('current_user') || '';
    obj.timestamp = Date.parse(new Date());
    array[i] = obj;
  }

  const handleSave = async (params) => {
    const response = await saveAnnotaions(params);
    if (response.status === 'ok') message.success('标注结果保存成功！');
  };

  return (
    <PageContainer>
      <ReactImageAnnotate
        taskDescription="你好"
        regionClsList={["background", "car", "cyclist", "pedestrain"]}
        regionTagList={["moving", "obstacle"]}
        images={array}
        onExit= {(args) => {
          let finishFlag = true;
          let index = 0;
          let name = '';
          for (let i=0; i < args.images.length; i ++) {
            let region = args.images[i].regions
            if (region.length == 0) {
              finishFlag = false;
              index = i;
              name = args.images[i].name;
              break;
            }
          }
          
          if(finishFlag) {
            handleSave(args.images);
            return Promise.resolve();
          } else {
            message.warning(`标注结果不完整！第${index+1}张${name}未标注`);
          }
          }
        }
      />
    </PageContainer>
  );
};

export default Annotation;