// Postavljanje Component-a i React
import { Component } from "react";
import React from "react";

// Definiranje Messages komponente
class Messages extends Component {
	// Render metoda koja vraća listu poruka
	render() {
		const { messages } = this.props;
		return (
			<ul className='Messages-list'>
				{messages.map((m, index) => this.renderMessage(m, index))}
			</ul>
		);
	}

	// Metoda izlistava pojedine poruke
	renderMessage(message, index) {
		const { member, text } = message;
		const { currentMember } = this.props;
		const messageFromMe = member.id === currentMember.id;
		const className = messageFromMe
			? "Messages-message currentMember"
			: "Messages-message";
		return (
			<li key={index} className={className}>
				<span
					className='avatar'
					style={{ backgroundColor: member.clientData.color }}
				/>
				<div className='Message-content'>
					<div className='username'>{member.clientData.username}</div>
					<div className='text'>{text}</div>
				</div>
			</li>
		);
	}
}

// Izvozom Messages komponente omogućujemo druge skripte da je koriste kao jedinicu
export default Messages;
