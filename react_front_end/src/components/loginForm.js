import React from 'react'

import {Form,Icon,Input,Button,CheckBox} from 'antd'


const LoginForm =() => {
   
    const handleSubmit = () =>{

    }
   
    return(
      
        <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
          (
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <div>1111</div>
        </Form>
    )
}

export default LoginForm