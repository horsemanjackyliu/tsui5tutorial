import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import InputBase, { InputBase$ChangeEvent } from "sap/m/InputBase";
import Input from "sap/m/Input";
import * as Nominatim from "nominatim-client";

type WeatherInfo = {
	current_weather: {
		temperature: number,
		windspeed: number,
		winddirection: number
	},
	placeName: string
}

/**
 * @namespace com.sap.ui5tutorial.controller
 */
export default class Main extends BaseController {
	onInit(): void | undefined {
		const model = new JSONModel();
		this.setModel(model);
		void this.loadWeatherData();

		const input = this.byId("location");
		if (input.isA<Input>("sap.m.Input")) { // type guard (unfortunately the control class needs to be given twice)
			input.attachChange(function(evt) { // now TS knows input is an Input
				const location = evt.getParameter("value"); // type safety even for string-based access
			});
		}

	}
	public sayHello(): void {
		MessageBox.show("Hello World!");
	}
	async loadWeatherData(lat = "49.31", lon = "8.64",placeName = "Walldorf") {
		const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
		const jsonData = await response.json() as WeatherInfo;
		jsonData.placeName = placeName;
		(this.getModel() as JSONModel).setData(jsonData);
	}


	locationChange(evt: InputBase$ChangeEvent) {
		const location = evt.getParameters().value;
		Nominatim.createClient({
			useragent: "UI5 TypeScript Tutorial App", // useragent and referrer required by the terms of use
			referer: "https://localhost"
		}).search({q:location}).then((results) =>{
			if (results.length > 0) {
				return this.loadWeatherData(results[0].lat, results[0].lon, results[0].display_name); // for simplicity just use the first/best match
			} else {
				MessageBox.alert(`Location ${location} not found`, {
					actions: MessageBox.Action.CLOSE // enums are now properties on the default export!
				});
			}
		}).catch(()=>{
			MessageBox.alert(`Failure while searching ${location}`, {
				actions: MessageBox.Action.CLOSE // enums are now properties on the default export!
			});
		})
	}
}
