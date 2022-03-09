import React, { Component } from "react";
import { useParams } from "react-router";
import { Route, Routes, useNavigate } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";

function findPalette(id) {
	return seedColors.find(function (palette) {
		return palette.id === id;
	});
}
function PaletteWrapper() {
	const { id } = useParams();
	return <Palette palette={generatePalette(findPalette(id))} />;
}
function PaletteListWrapper() {
	const navigate = useNavigate();
	return <PaletteList palettes={seedColors} navigate={navigate} />;
}
function SingleColorPaletteWrapper() {
	const { paletteId, colorId } = useParams();
	return <SingleColorPalette palette={generatePalette(findPalette(paletteId))} colorId={colorId}/>;
}
class App extends Component {
	render() {
		return (
			<Routes>
				<Route exact path="/" element={<PaletteListWrapper />} />
				<Route exact path="/palette/:id" element={<PaletteWrapper />} />
				<Route
					exact
					path="/palette/:paletteId/:colorId"
					element={<SingleColorPaletteWrapper />}
				/>
			</Routes>
		);
	}
}

export default App;
