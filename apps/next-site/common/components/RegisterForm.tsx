import React from "react"
import { Form, Input, Button, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useForm } from "antd/lib/form/Form"
import wrappedFetch from "../../utils/wrappedFetch"
import getLogger from "../../utils/getLogger"
import { useSetRecoilState } from "recoil"
import { userProps } from "client/atoms"

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
  }
  const [form] = useForm()
  const setUser = useSetRecoilState(userProps)
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
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
        <Button
          onClick={async (e) => {
            //  console.log(form.getFieldsValue())
            let ret
            try {
              ret = await wrappedFetch("/api/-/register", {
                method: "POST",
                body: JSON.stringify(form.getFieldsValue()),
              })
              // localStorage.setItem("token", ret.token)
              window.location.replace("/")
              setUser(ret)
            } catch (e) {
              console.warn(e)
            }
          }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App
