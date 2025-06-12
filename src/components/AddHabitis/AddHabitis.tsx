import { Collapse, Button, Form, Input, Space, message } from "antd"
import { memo, useCallback, useContext } from "react"
import { AppContext } from "../../context/contextProvider"
import type { HabitisValues } from "@models/models"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const FormComponent = memo(() => {
  const [form] = Form.useForm()
  const { TextArea } = Input

  const { getData, saveData } = useContext(AppContext)

  const onFinish = useCallback(
    (values: HabitisValues) => {
      try {
        values.nowCount = 0
        saveData([...getData(), values])
        form.resetFields()
        message.success("Привычка успешно добавлена!")
        
      } catch (error) {
        console.error("Ошибка при сохранении привычки:", error)
        message.error("Произошла ошибка при сохранении")
      }
    },
    [form, getData, saveData],
  )

  const onReset = () => {
    form.resetFields()
  }

  return (
    <Form
      layout="vertical"
      {...layout}
      form={form}
      name="add-habitis"
      onFinish={onFinish}
      style={{ maxWidth: 600}}
    >
      <Form.Item
        name="title"
        label="Название"
        rules={[
          {
            required: true,
            message: "Я для тебя прикол? Ты как поймешь че отмечать, ало",
          },
        ]}
      >
        <Input placeholder="Например: Пить воду" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Описание"
        rules={[{ required: false }]}
      >
        <TextArea placeholder="Чего ты хочешь достичь?" rows={2} />
      </Form.Item>
      <Form.Item
        name="goal"
        label="Количество дней"
        rules={[
          { required: true, message: "Если цель 0 дней, то ты молодец уже" },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Сбросить
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
})

const items = () => [
  {
    key: "1",
    label: "Добавить трекер",
    children: <FormComponent  />,
  },
]

export const AddHabitis = () => {

  return <Collapse style={{width: '100%'}} items={items() } />
}
