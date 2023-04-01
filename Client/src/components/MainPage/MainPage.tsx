import { ControlView } from "../ControlView/ControlView"
import { GameView } from "../GameView/GameView"

import styles from './MainPage.module.scss'

export const MainPage = () => {
    return (
        <section className={styles.mainLayout}>
            <GameView />
            <ControlView />
        </section>
    )
}