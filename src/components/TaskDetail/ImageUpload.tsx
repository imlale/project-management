
import { useState } from 'react';
import { Upload , App } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useDispatch } from 'react-redux';
import { setTaskData } from '../../redux/taskSlice';

const ImageUpload= ({imageUrl} : {imageUrl: string}) => {
    const initial :UploadFile[] = [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: imageUrl,
      }];
  const [fileList, setFileList] = useState(imageUrl?initial:[]);
  const dispatch = useDispatch()
  const {message} = App.useApp()

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
    if(newFileList.length>0 && checkFile(newFileList[0])){
      
      getBase64Image(newFileList[0])
      .then((data)=>{
         dispatch(setTaskData({attachedImage : data}))
      })
    }else{
      dispatch(setTaskData({attachedImage : ''}))
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };


  const getBase64Image = async (file : UploadFile )=>{
    let src = file.url as string;
    if (!src) {
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
  }
  const customRequest = async (options: any) => {
    
    options.onSuccess(); 

  };

  const checkFile = (file: UploadFile) => {
    // Define el tamaño máximo permitido en bytes (por ejemplo, 1MB).
    const maxSize = 1 * 250 * 1024; // 250KB

    if (file.size && file.size > maxSize) {
      message.error('File too big. max 250KB');
      setFileList([]);
      return false; // Detiene la carga del archivo
    }

    return true; // Permite la carga del archivo
  };

  return (

      <Upload name='attachedImage'
        customRequest={customRequest}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        accept="image/png, image/jpeg"
       
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>

  );
};

export default ImageUpload;