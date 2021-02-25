import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import {
	SUCCESS_MESSAGE,
	ERROR_MESSAGES,
	SUCCESS_TYPE,
	ERROR_TYPE
} from '../../constants';

function Toast({ onClose, info }) {
	const [message, setMessage] = useState();
	const [type, setType] = useState();

	useEffect(() => {
		if (info) {
			setMessage(ERROR_MESSAGES[info] || SUCCESS_MESSAGE);
			setType(ERROR_TYPE[info] || SUCCESS_TYPE);
		}
	}, [info]);

	return (
		<Snackbar open={!!info} autoHideDuration={5000} onClose={onClose}>
			<Alert elevation={6} variant='filled' severity={type}>
				{message}
			</Alert>
		</Snackbar>
	);
}

Toast.propTypes = {
	info: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onClose: PropTypes.func
};

export default memo(Toast);
