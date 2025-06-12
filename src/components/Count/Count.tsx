import type { FC } from "react"
import { useContext, useEffect, useState } from "react"
import { MinusOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons"
import { Button, Flex, message, Progress, Space } from "antd"
import { AppContext } from "../../context/contextProvider"

interface Props {
  index: number
}
export const Count: FC<Props> = ({ index }) => {
  const { getData, saveData } = useContext(AppContext)
  const [items] = useState(getData())
  const [count, setCount] = useState<number>(items[index].nowCount)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    setPercent(Number(((count * 100) / items[index].goal).toFixed(2)))
  }, [count, index, items])

  useEffect(() => {
    const updatedItems = getData()
    updatedItems[index].nowCount = count
    saveData(updatedItems)
  }, [count, index, getData, saveData])

  const increase = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1
      return newCount > items[index].goal ? items[index].goal : newCount
    })
     message.success("Краусаучэг")

  }

  const decline = () => {
    setCount(prevCount => {
      const newCount = prevCount - 1
      return newCount < 0 ? 0 : newCount
    })
     message.success("Оаоаааа, а что это мы сдаем назад?")
  }

  const deleteHabbit = () => {
    const updatedItems = getData().filter((_, i) => i !== index)
    saveData(updatedItems)
    message.success("Привычка удалена")
  }

  return (
    <Flex vertical gap="small">
      <Flex vertical gap="small">
        <Progress
          percent={percent}
          format={() => {
            return count >= items[index].goal
              ? "done"
              : `${count} days / ${items[index].goal} days`
          }}
          type="line"
        />
      </Flex>
      <Space.Compact>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button
          style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
          onClick={increase}
          icon={<PlusOutlined />}
        />
        <Button
          style={{
            width: 50,
            background: "red",
            margin: "0 0 0 auto",
            borderRadius: 10,
          }}
          onClick={deleteHabbit}
          icon={<CloseOutlined />}
        />
      </Space.Compact>
    </Flex>
  )
}
