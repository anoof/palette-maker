import React, { Component } from "react";
import Navbar from "./NavBar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(this.props.palette, this.props.colorId);
		this.state = { format: "hex" };
		this.changeFormat = this.changeFormat.bind(this);
	}
	changeFormat(val) {
		this.setState({ format: val });
	}
	gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter((color) => color.id === colorToFilterBy)
			);
		}
		return shades.slice(1);
	}
	render() {
		const { format } = this.state;
		const { paletteName, emoji } = this.props.palette;
		const colorBoxes = this._shades.map((color) => (
			<ColorBox
				background={color[format]}
				name={color.name}
				key={color.id}
				id={color.id}
			/>
		));
		return (
			<div className="Palette">
				<Navbar handleChange={this.changeFormat} showingAllColors={false} />
				<div className="Palette-colors">{colorBoxes}</div>
				<PaletteFooter  paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default SingleColorPalette;
