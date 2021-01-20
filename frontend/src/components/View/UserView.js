import React from 'react';
import { Grid } from '@material-ui/core';
import { PageHeader, Dropdown, Pagination, UserMenu, Table } from '../UI';

const UserView = () => {
	const mainTitle = '회원 정보';
	const tableHead = ['문제 번호', '제목', '분류'];
	const tableBody = [1, '문제 1', '카카오 2020 코딩테스트'];
	const label = '한 페이지 당 문제 수:';
	const label2 = '해결 여부';
	const values2 = ['해결', '미해결'];
	const dropdownHasLabel = false;
	const values = [...Array(12)].map((_, index) => index + 1);

	return (
		<Grid className="user">
			<Grid className="user-header">
				<PageHeader mainTitle={mainTitle} />
			</Grid>
			<Grid container direction="row" className="user-container">
				<Grid className="user-menu">
					<UserMenu />
				</Grid>
				<Grid container direction="column" className="user-table">
					<Grid container className="user-dropdown" direction="row">
						<Dropdown label={label2} values={values2} />
					</Grid>
					<Table
						head={tableHead}
						rows={[...Array(10)].map(() => tableBody)}
					/>

					<Grid className="user-tableselector">
						<Grid className="user-tableselector-start">
							{label}
							<Dropdown
								hasLabel={dropdownHasLabel}
								values={values}
								defaultValue={10}
							/>
						</Grid>
						<Pagination count={4} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default UserView;
