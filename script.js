const lyricsInput = document.getElementById("lyrics-input")
const lyricsOutput =  document.getElementById("lyrics")
const chordList = document.getElementById("chords")
const chordRegex = /\[(\w+\d?)\]|\n/g;


function createChord(name) {
	// <span class="chord">[c]</span>
	const chord = document.createElement("span");
	chord.className = "chord";
	chord.innerText = `[${name}]`;
	const chordImgUrl = `chord/${name}.png`;

	if(!chordList.querySelector(`[src="${chordImgUrl}"]`)) {
		const chordImage = new Image();
		chordImage.src = chordImgUrl;
		chordList.appendChild(chordImage)
	}


	return chord
}

function update(lyrics) {
		const chords = lyrics.matchAll(chordRegex);
		let lastIndex = 0;
	
		//reset
		lyricsOutput.innerText = "";
		chordList.innerHTML = "";
	
		for(const chord of chords) {
			const chordCharacterCount = chord[0].length;
			const textBetweenLastChordAndThisChord = lyrics.substring(lastIndex, chord.index);

			lyricsOutput.appendChild(document.createTextNode(textBetweenLastChordAndThisChord))
			if(chord[0] === "\n"){
				lyricsOutput.appendChild(document.createElement("br"))
			}else {
				lyricsOutput.appendChild(createChord(chord[1].toLowerCase()))
			}
	
			lastIndex = chord.index + chordCharacterCount;
		}
		if(lastIndex !== lyrics.length) {
			const textBetweenLastChordAndEnd = lyrics.substring(lastIndex, lyrics.length);
			lyricsOutput.appendChild(document.createTextNode(textBetweenLastChordAndEnd))
		}

		lyricsOutput.appendChild(document.createElement("br"))
}

lyricsInput.addEventListener("input",e=>{
	update(e.target.value)
})

document.addEventListener("DOMContentLoaded",e=>{
	update(lyricsInput.value)
})