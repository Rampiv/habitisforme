import type { FC } from "react"
import { useContext, useEffect, useState } from "react"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Flex, Progress, Space } from "antd"
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
    setPercent(
      Number(((items[index].nowCount * 100) / items[index].goal).toFixed(2)),
    )
  }, [index, items])

  const updateCount = (newCount: number) => {
    const updatedItems = getData()
    updatedItems[index].nowCount = newCount
    console.log(updatedItems)
    saveData(updatedItems)
  }

  const increase = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1
      setPercent(Number(((newCount * 100) / items[index].goal).toFixed(2)))
      updateCount(newCount)
      if (newCount === items[index].goal) {
        return items[index].goal
      }
      return newCount
    })
  }

  const decline = () => {
    setCount(prevCount => {
      const newCount = prevCount - 1
      setPercent(Number(((newCount * 100) / items[index].goal).toFixed(2)))
      updateCount(newCount)
      if (newCount < 0) {
        return 0
      }
      return newCount
    })
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
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Space.Compact>
    </Flex>
  )
}
