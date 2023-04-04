import React, { useState } from 'react';
import Form from './Form';
import Results from './Results';

function Container() {

	const [ isLoading, setIsLoading ] = useState( false );
	const [ results, setResults ] = useState( [] );
	const [ didSearch, setDidSearch ] = useState( false );

	const getResults = ( res ) => {
		setResults( res );
	};

	const toggleLoader = ( isLoading ) => {
		setIsLoading( isLoading );
	};

	const toggleDidSearch = () => {
		setDidSearch( true );
	};

	return (
		<div className="mailHunter__container">
			<div className={ isLoading ? "mailHunter__loader" : "mailHunter__loader mailHunter__loader--hidden" }>
				
			</div>
			<h1 className="mailHunter__title">MailHunter</h1>
			<Form toggleLoader={ toggleLoader } toggleDidSearch={ toggleDidSearch } getResults={ getResults } />
			<Results results={ results } didSearch={ didSearch } />
		</div>
		);
}

export default Container;