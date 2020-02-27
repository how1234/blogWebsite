import React, { useState } from "react";
import { Upload, Button, Icon } from "antd";
import { toBase64,fromBase64,fromFile } from "../helper/fileReader";
const UploadButton = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);


  const handleUpload = async () => {
    const sentFiles = []

    
    try{
        for (let file of fileList) {
            const based64File = await toBase64(file)
            const fileObject = {fileData:based64File,fileName:file.name}
            sentFiles.push(fileObject)
        }
       
        setUploading(true);

        
    fetch("http://localhost:8000/graphql",{
        method:"POST",
        body: JSON.stringify({ sentFiles }),
        headers: {
          "Content-Type": "application/json"
        },
    })
    }catch(err){
        throw err
    }
   

    

  };

  const onRemove = file => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();

    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const beforeUpload = file => {
    setFileList([...fileList, file]);
  };


//   const uploadProps = {
//     action: async file => {
//       const based64File = await toBase64(file);
//       console.log(based64File);
//       fetch("http://localhost:8000/graphql", {
//         method: "POST",
        // body: JSON.stringify({ based64File }),
        // headers: {
        //   "Content-Type": "application/json"
        // },
       
//       });
//     },
//     onChange: handleChange,
//     multiple: true
//   };

const uploadProps = {
    onRemove,
    beforeUpload,
    fileList
}
  return (
    <div>
      <Upload {...uploadProps}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
      <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
    </div>
  );
};

export default UploadButton;
