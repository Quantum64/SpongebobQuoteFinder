import episodes from "./episodes"

export function search(text) {
    text = text.toLowerCase();
    let result = [];

    // Benchmark
    let benchmark = Date.now();

    seasonLoop:
    for (let season of episodes) {
        for (let episode of season.episodes) {
            let matches = 0;
            for (let line of episode.lines) {
                if (line.text.toLowerCase().includes(text)) {
                    const percent = Math.abs(((nthIndex(episode.text.toLowerCase(), text, matches + 1) / episode.text.length) * 100)).toFixed();
                    let bold = line.text.splice(line.text.toLowerCase().indexOf(text), 0, "<b>");
                    bold = bold.splice(line.text.toLowerCase().indexOf(text) + text.length + 3, 0, "</b>")
                    result.push({
                        line: bold,
                        by: line.by,
                        season: season.number,
                        episode: episode.number,
                        title: episode.title,
                        percent: percent
                    });
                    if (result.length >= 5) {
                        break seasonLoop;
                    }
                    matches++;
                }
            }
        }
    }

    // Benchmark result
    console.log("Search took " + (Date.now() - benchmark) + "ms.")

    return result;
}

function nthIndex(str, pat, n) {
    var L = str.length, i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}