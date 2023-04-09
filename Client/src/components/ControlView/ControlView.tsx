
import styles from './ControlView.module.scss'

export const ControlView = () => {
    return (
        <section className={styles.controlViewSection}>
            <div className="messege"></div>
            <div className="input-section"></div>
            <div className="button-section"></div>
        </section>
    )
}