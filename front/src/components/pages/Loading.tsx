import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import styles from './Loading.module.scss';

const Loading = () => {
    const {isLoading} = useAppSelector(state => state.authReducer);

    if (!isLoading) {
        return null;
    }

    return (
        <div className={styles['loading-container']}>
            <div className={styles.loading}></div>
            <div id={styles['loading-text']}>Загрузка</div>
        </div>
    );
};

export default Loading;
