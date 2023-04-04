import React from 'react';
import Form from './Form';
import Results from './Results';

class Container extends React.Component {

	constructor() {
		super();

		this.state = {
			isLoading: false,
			results: [],
			didSearch: false
		};

		this.toggleLoader = this.toggleLoader.bind( this );
		this.toggleDidSearch = this.toggleDidSearch.bind( this );
		this.getResults = this.getResults.bind( this );
	}

	getResults( results ) {
		this.setState( { results: results } );
	}

	toggleLoader( isLoading ) {
		this.setState( { isLoading: isLoading } );
	}

	toggleDidSearch() {
		this.setState( { didSearch: true } );
	}

	render() {
		return <div className="mailHunter__container">
			<div className={ this.state.isLoading ? "mailHunter__loader" : "mailHunter__loader mailHunter__loader--hidden" }>
				
			</div>
			<h1 className="mailHunter__title">MailHunter</h1>
			<Form toggleLoader={ this.toggleLoader } toggleDidSearch={ this.toggleDidSearch } getResults={ this.getResults } />
			<Results results={ this.state.results } didSearch={ this.state.didSearch } />
		</div>;
	}
}

export default Container;