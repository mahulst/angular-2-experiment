import {Inject} from 'di';

export function contentList() {
    var rows = [];
    var i = 0;
    while (++i <= 50) {
        rows.push({
            id: i,
            title: 'Item title ' + i,
            body: 'Item body ' + i
        });
    }
    return rows;
}

@Inject(contentList)
export function contentExists(contentList) {
    return function(id) {
        return !!contentList[id - 1];
    };
}

@Inject(contentList)
export function contentItem(contentList) {
    return function(id) {
        return contentList[id - 1];
    };
}