import { useContext, useMemo } from "react"
import { AddHabitis, Count } from "../../components"
import { AppContext } from "../../context/contextProvider"
import './MainPage.scss'

export const MainPage = () => {
  const { items } = useContext(AppContext)


  // Замемоизированный маппинг списка
  const habitItems = useMemo(
    () =>
      items.map((item, index) => (
        <li key={index} className="mainpage__item">
          {
            <>
              <h3 className="mainpage__item-title">{item.title}</h3>
              <Count index={index} />
            </>
          }
        </li>
      )),
    [items],
  )

  return (
    <section className="mainpage">
      <h1 className="mainpage__title">Трекер привычек</h1>
      <AddHabitis />
      {items.length > 0 ? (
        <ul className="mainpage__list">{habitItems}</ul>
      ) : (
        <p>Нет привычек для отображения</p>
      )}
    </section>
  )
}
