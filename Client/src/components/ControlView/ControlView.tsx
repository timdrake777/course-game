
import { CodeInputs } from '../CodeInputs/CodeInputs'
import styles from './ControlView.module.scss'

export const ControlView = () => {
    return (
        <section className={styles.controlViewSection}>
            <div className="message"></div>
            <div className="input-section">
                <CodeInputs />
            </div>
            <div className="button-section"></div>
        </section>
    )
}