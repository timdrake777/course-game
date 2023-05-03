
import CodeButtons from '../CodeButtons/CodeButtons'
import { CodeInputs } from '../CodeInputs/CodeInputs'
import styles from './ControlView.module.scss'

export const ControlView = () => {
    return (
        <main className={styles.controlViewSection}>
            <section className={styles.messageSection}></section>
            <section className={styles.inputSection}>
                <CodeInputs />
            </section>
            <section className={styles.buttonSection}>
                <CodeButtons/>
            </section>
        </main>
    )
}