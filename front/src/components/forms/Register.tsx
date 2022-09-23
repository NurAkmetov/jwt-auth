import React, {FC, useState} from 'react';
import {registration} from "../../state/auth/asyncActions";
import {useAppDispatch} from "../../hooks/redux";
import styles from "./Login.module.scss";
import {Link} from "react-router-dom";

const Register: FC = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className={styles['form-container']}>
            <div className={styles.inset}>
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
                    onClick={() => dispatch(registration(email, password))}
                >
                    Регистрация
                </button>
                <Link className={styles['login-link']} to='/'>Вход</Link>
            </div>
        </form>
    );
};

export default Register;