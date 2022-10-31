import React from "react"
import { Form, Input, Button, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useForm } from "antd/lib/form/Form"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { useSetRecoilState } from "recoil"
import { loginStatus, userPros } from "common/atoms"

const StyledForm = styled(Form)`
  background: #fff;
  padding: 20px;
`

const LoginForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
  }
  const setLoginStatus = useSetRecoilState(loginStatus)
  const setUserProps = useSetRecoilState(userPros)
  // const dispatch = useDispatch()
  const [form] = useForm()
  return (
    <StyledForm
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          onClick={async (e) => {
            //  console.log(form.getFieldsValue())
            let ret

            ret = await window
              .fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(form.getFieldsValue()),
              })
              .then((r) => {
                // console.log(r)
                if (!r.ok) {
                  throw new Error(r.statusText)
                }
                return r.json()
              })

            setLoginStatus("VERIFIED")
            setUserProps(ret.props)
            // window.close()
          }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </StyledForm>
  )
}

const StyledModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ({ visible }) => {
  return (
    <StyledModalContainer style={{ display: visible ? "flex" : "none" }}>
      <LoginForm></LoginForm>
    </StyledModalContainer>
  )
}
