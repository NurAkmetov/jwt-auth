import React, {FC, useState} from 'react';
import {login} from "../../state/auth/asyncActions";
import {useAppDispatch} from "../../hooks/redux";
import styles from "./Login.module.scss";
import {Link} from "react-router-dom";

export const Login: FC = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles['form-container']}>
            <form className={styles.inset}>
                <img className={styles.logo} src="/assets/logo.png" alt="logo"/>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder='E-mail'
                    autoComplete='off'
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='Пароль'
                    autoComplete='off'
                />
                <button
                    type="button"
                    className={styles['submit-button']}
                    onClick={() => dispatch(login(email, password))}
                >
                    Вход
                </button>
                <Link className={styles['register-link']} to='/register'>Регистрация</Link>
            </form>
        </div>
    );
};
