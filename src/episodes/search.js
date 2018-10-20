import episodes from "./episodes"

export function search(text) {
    text = text.toLowerCase();
    let result = [];
    for (let season of episodes) {
        for (let episode of season.episodes) {
            let matches = 0;
            for (let line of episode.lines) {
                if (line.text.toLowerCase().includes(text)) {
                    const percent = Math.abs(((nthIndex(episode.text.toLowerCase(), text, matches + 1) / episode.text.length) * 100)).toFixed();
                    result.push({
                        line: line.text,
                        by: line.by,
                        season: season.number,
                        episode: episode.number,
                        title: episode.title,
                        percent: percent
                    });
                    if (result.length >= 5) {
                        return result;
                    }
                    matches++;
                }
            }
        }
    }
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