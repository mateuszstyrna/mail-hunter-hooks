import React from 'react';

function Results( props ) {

	return (
		<div className="mailHunter__results">
			{ props.didSearch ?
					props.results.length > 0 ?
						<ul>
							{ props.results.map( ( email ) => {
								return <li key={email}>{ email }</li>
							} ) }
						</ul>
					:
						"Did not found any email addresses."
				
				:
					""
			}
		</div>
		);
}

export default Results;