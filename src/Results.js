import React from 'react';

class Results extends React.Component {

	render() {
		return <div className="mailHunter__results">
			{ this.props.didSearch ?
					this.props.results.length > 0 ?
						<ul>
							{ this.props.results.map( ( email ) => {
								return <li key={email}>{ email }</li>
							} ) }
						</ul>
					:
						"Did not found any email addresses."
				
				:
					""
			}
		</div>;
	}
}

export default Results;