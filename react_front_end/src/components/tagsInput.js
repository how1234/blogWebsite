import React, { useState } from "react";
import { Select, Divider,Input,Icon,Button} from "antd";
import { useSelector,useDispatch } from "react-redux";
import { PlusOutlined } from 'antd/lib/icon';



export const AdminTagsInput=() => {
    const onNameChange= () => {

    }
    const [items,setItems] = useState(['jack', 'lucy'])
    return (
        <Select
        style={{ width: 240 }}
        placeholder="custom dropdown render"
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input style={{ flex: 'auto' }} value="values"/>
              <Button
                style={{marginLeft:"5px", cursor: 'pointer' }}
              >
                <Icon type="PlusCircleOutlined" /> Add Tags
              </Button>
            </div>
          </div>
        )}
      >
        {items.map(item => (
          <Select.Option key={item}>{item}</Select.Option>
        ))}
      </Select>
        
    )
}
