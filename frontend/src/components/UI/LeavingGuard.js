import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
import NoticeDialog from './NoticeDialog';

export const LeavingGuard = ({ navigate, when, shouldBlockNavigation }) => {
	const [visible, setVisible] = useState(false);
	const [lastLocation, setLastLocation] = useState();
	const [confirmedNavigation, setConfirmedNavigation] = useState(false);

	const showModal = (location) => {
		setVisible(true);
		setLastLocation(location);
	};
	const closeModal = (e) => {
		setVisible(false);
		if (e) {
			e();
		}
	};
	const handleBlockedNavigation = (nextLocation) => {
		if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
			showModal(nextLocation);
			return false;
		}
		return true;
	};
	const handleConfirmNavigationClick = () => {
		closeModal(() => {
			if (lastLocation) {
				setConfirmedNavigation(true);
			}
		});
	};

	useEffect(() => {
		if (confirmedNavigation) {
			navigate(lastLocation.pathname);
			setConfirmedNavigation(false);
		}
	}, [confirmedNavigation]);

	return (
		<div>
			<Prompt when={when} message={handleBlockedNavigation} />
			<NoticeDialog
				visible={visible}
				title="알림"
				info="모든 정보가 사라집니다. 정말로 나가시겠습니까?"
				path="/"
				onCancel={closeModal}
				onConfirm={handleConfirmNavigationClick}
			/>
		</div>
	);
};

export default LeavingGuard;
