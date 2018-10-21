import seasons from './seasons'

const lineRegex = /:(.+)/;

let sindex = 1;
for (let season of seasons) {
    let eindex = 1;
    for (let episode of season.episodes) {
        if (typeof episode != "string") {
            console.log("s = " + sindex + ", e = " + eindex + ", e = " + episode)
            console.log(episode)
        }
        eindex++;
    }
    sindex++;
}

//Benchmark
let startTime = Date.now();
let epCount = 0;

let result = [];
for (let season of seasons) {
    let seasonResult = {
        number: season.number,
        episodes: []
    };
    for (let episode of season.episodes) {
        const lines = episode.split("\n");
        let episodeResult = {
            number: lines[0],
            title: lines[1],
            text: "",
            lines: []
        }
        for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex].split(lineRegex);
            line[1] = line[1] === undefined ? "" : line[1].trim();
            line[0] = line[0] === undefined ? "Unknown" : line[0].trim();
            episodeResult.text += line[1];
            episodeResult.lines.push({
                text: line[1],
                by: line[0]
            });
        }
        epCount++;
        seasonResult.episodes.push(episodeResult);
    }
    result.push(seasonResult);
}

// Benchmark
let delta = Date.now() - startTime;
let timePerFile = (delta / epCount).toFixed(2);
console.log("Parse took " + delta + "ms, for an average time of " + timePerFile + "ms per file.")

export default result;