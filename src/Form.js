import React from 'react';

class Form extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			domain: "",
			path: ""
		};
		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	handleSubmit( event ) {
		event.preventDefault();
		this.props.toggleLoader( true );

		const domain = this.state.domain;
		const path = this.state.path;

		fetch( `./mailHunter.php?domain=${ domain }&path=${ path }` )
		.then( ( response ) => {
			try {
				JSON.parse( response );
			} catch ( e ) {
				return [ "An error has occured. Please make sure provided data are correct." ];
			}
			return response.json();
		} )
		.then( ( data )=> {
			this.props.toggleLoader( false );
			this.props.getResults( data );
			this.props.toggleDidSearch( true );
		} );
	}

	handleChange( event ) {
		const target = event.target;
	    const value = target.value;
	    const name = target.name;
		this.setState( {
      		[name]: value
      	} );
	}

	render() {
		return <form className="mailHunter__form" onSubmit={ this.handleSubmit }>
		<label htmlFor="domain" className="mailHunter__label">
			Domain:
			<input onChange={ this.handleChange } type="text" id="domain" name="domain" placeholder="example.com" className="mailHunter__input mailHunter__input--text" />
		</label>
		<label htmlFor="path" className="mailHunter__label">
			Path (optional):
			<input onChange={ this.handleChange } type="text" id="path" name="path" placeholder="/path/" className="mailHunter__input mailHunter__input--text" />
		</label>
			<input type="submit" name="go" value="Look for emails" className="mailHunter__input mailHunter__input--button" />
		</form>;
	}
}

export default Form;