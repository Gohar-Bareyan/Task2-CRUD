import styles from "./index.module.scss"

interface Props {
    title: string
}

export default function (props:Props) {
    return (
        <div className={styles.header}>
            <h1>{props.title}</h1>
        </div>
    )
}

