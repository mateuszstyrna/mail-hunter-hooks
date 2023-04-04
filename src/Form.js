import React, { useState } from 'react';

function Form( props ) {

	const [ form, setForm ] = useState( {
		domain: "",
		path: ""
	} );

	const handleSubmit = ( event ) => {
		event.preventDefault();
		props.toggleLoader( true );

		const domain = form.domain;
		const path = form.path;

		fetch( `./mailHunter.php?domain=${ domain }&path=${ path }` )
		.then( ( response ) => {
			return response.json();
		} )
		.then( ( data )=> {
			console.log( data );
			props.toggleLoader( false );
			props.getResults( data );
			props.toggleDidSearch( true );
		} );
	};

	const handleChange = ( event ) => {
		const target = event.target;
	    const value = target.value;
	    const name = target.name;
		setForm( ( prev ) => {
				return {
					...prev,
	      			[ name ]: value
				};
      	} );
	};

	return (
		<form className="mailHunter__form" onSubmit={ handleSubmit }>
			<label htmlFor="domain" className="mailHunter__label">
				Domain:
				<input onChange={ handleChange } type="text" id="domain" name="domain" placeholder="example.com" className="mailHunter__input mailHunter__input--text" />
			</label>
			<label htmlFor="path" className="mailHunter__label">
				Path (optional):
				<input onChange={ handleChange } type="text" id="path" name="path" placeholder="/path/" className="mailHunter__input mailHunter__input--text" />
			</label>
				<input type="submit" name="go" value="Look for emails" className="mailHunter__input mailHunter__input--button" />
		</form>
	);
}

export default Form;