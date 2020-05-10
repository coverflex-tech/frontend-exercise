import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Card.module.css';

const Card = ({id, name, price, disabled, selected, onClick, className}) => {
    const handleClick = useCallback(() => {
        !disabled && onClick(id);
    }, [disabled, onClick, id]);

    return (
        <div className={ classNames(styles.container, disabled && styles.disabled, className)}>
            <div className={ styles.text }>
                <div className={ styles.name }>
                    { name }
                </div>
                { disabled && (
                    <div className={ styles.hint }>
                        You've already ordered this item
                    </div>
                )}
            </div>
            <div className={ styles.details }>
                <div className={ styles.price }>
                    { price }
                </div>
                <div
                    tabIndex={ 0 }
                    role="button"
                    className={ classNames(styles.action, selected && styles.selected) }
                    onClick={ handleClick }>
                    {
                        selected ? 'Remove' : 'Select'
                    }
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onClick: PropTypes.func,
}

Card.defaultProps = {
    selected: false,
    disabled: false,
}

export default Card;