import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";
import image from "./images/algebra-logo.jpg";

// Funkcija za generiranje slučajnih naziva
function randomName() {
	const adjectives = [
		"autumn",
		"hidden",
		"bitter",
		"misty",
		"silent",
		"empty",
		"dry",
		"dark",
		"summer",
		"icy",
		"delicate",
		"quiet",
		"white",
		"cool",
		"spring",
		"winter",
		"patient",
		"twilight",
		"dawn",
		"crimson",
		"wispy",
		"weathered",
		"blue",
		"billowing",
		"broken",
		"cold",
		"damp",
		"falling",
		"frosty",
		"green",
		"long",
		"late",
		"lingering",
		"bold",
		"little",
		"morning",
		"muddy",
		"old",
		"red",
		"rough",
		"still",
		"small",
		"sparkling",
		"throbbing",
		"shy",
		"wandering",
		"withered",
		"wild",
		"black",
		"young",
		"holy",
		"solitary",
		"fragrant",
		"aged",
		"snowy",
		"proud",
		"floral",
		"restless",
		"divine",
		"polished",
		"ancient",
		"purple",
		"lively",
		"nameless",
	];
	const nouns = [
		"waterfall",
		"river",
		"breeze",
		"moon",
		"rain",
		"wind",
		"sea",
		"morning",
		"snow",
		"lake",
		"sunset",
		"pine",
		"shadow",
		"leaf",
		"dawn",
		"glitter",
		"forest",
		"hill",
		"cloud",
		"meadow",
		"sun",
		"glade",
		"bird",
		"brook",
		"butterfly",
		"bush",
		"dew",
		"dust",
		"field",
		"fire",
		"flower",
		"firefly",
		"feather",
		"grass",
		"haze",
		"mountain",
		"night",
		"pond",
		"darkness",
		"snowflake",
		"silence",
		"sound",
		"sky",
		"shape",
		"surf",
		"thunder",
		"violet",
		"water",
		"wildflower",
		"wave",
		"water",
		"resonance",
		"sun",
		"wood",
		"dream",
		"cherry",
		"tree",
		"fog",
		"frost",
		"voice",
		"paper",
		"frog",
		"smoke",
		"star",
	];

	// Generiraj drugačiji random izraz
	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	return adjective + noun;
}

function randomColor() {
	return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
	state = {
		messages: [], // definiranje poruka
		member: {
			username: randomName(), // generiranje "random name"
			color: randomColor(), // generiranje "random color"
		},
	};

	constructor() {
		super();
		this.drone = new window.Scaledrone("gxJvZ9wSh8Id8JFg", {
			data: this.state.member,
		});
	}

	componentDidMount() {
		this.drone.on("open", (error) => {
			if (error) {
				return console.error(error);
			}
			const member = { ...this.state.member };
			member.id = this.drone.clientId; // definiranje ID-a u zavisnosti od Scalerone-a
			this.setState({ member });
		});
		const room = this.drone.subscribe("observable-room");
		room.on("data", (data, member) => {
			const messages = this.state.messages; // definiranje poruka
			messages.push({ member, text: data }); // dodavanje novih poruka
			this.setState({ messages }); // postavljanje novih poruka
		});
	}

	render() {
		return (
			<div className='App'>
				<div className='App-header'>
					<img src={image} alt='Logo'></img>
				</div>
				<Messages
					messages={this.state.messages} // notifikacije poruka
					currentMember={this.state.member} // podaci o trenutnom trenutnom korisniku
				/>
				<Input
					onSendMessage={this.onSendMessage} // poziv metode za slanje poruke
				/>
			</div>
		);
	}

	onSendMessage = (message) => {
		if (message.trim() === "") {
			alert("Nije ništa upisano! Upišite nešto u polje za unos poruke");
			return;
		}
		this.drone.publish({
			room: "observable-room",
			message,
		});
	};
}

export default App;
