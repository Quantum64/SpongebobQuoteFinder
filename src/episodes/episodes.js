import s1e01a from './s1/e01a';
import s1e01c from './s1/e01c';
import s1e02a from './s1/e02a';
import s1e02b from './s1/e02b';
import s1e03a from './s1/e03a';
import s1e03b from './s1/e03b';
import s1e04a from './s1/e04a';
import s1e04b from './s1/e04b';
import s1e05a from './s1/e05a';
import s1e05b from './s1/e05b';
import s1e06a from './s1/e06a';
import s1e06b from './s1/e06b';
import s1e07a from './s1/e07a';
import s1e07b from './s1/e07b';
import s1e08a from './s1/e08a';
import s1e08b from './s1/e08b';
import s1e09a from './s1/e09a';
import s1e09b from './s1/e09b';
import s1e10a from './s1/e10a';
import s1e10b from './s1/e10b';

const lineRegex = /:(.+)/;
const seasons = [
    {
        number: 1,
        episodes:
            [
                s1e01a, s1e01c, s1e02a, s1e02b, s1e03a, s1e03b, s1e04a, s1e04b, s1e05a, s1e05b,
                s1e06a, s1e06b, s1e07a, s1e07b, s1e08a, s1e08b, s1e09a, s1e09b, s1e10a, s1e10b,
            ]
    }
];

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