import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.module.css';

const Header = ({ userName, balance, onSignOut}) => {
    return (
        <div className={ styles.container }>
            <h4 className={ styles.userName }>
                { userName }
            </h4>
            <div className={ styles.moreInfo }>
                <h5 className={ styles.balance }>
                    Balance: { balance }
                </h5>
                <button onClick={onSignOut} className={ styles.signOut }>
                    Sign out
                </button>
            </div>
        </div>
    );
}

Header.propTypes = {
    userName: PropTypes.string,
    balance: PropTypes.number,
    onSignOut: PropTypes.func,
}

export default Header;