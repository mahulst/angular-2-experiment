import {Inject} from 'di';

export var itemsOptions = {
    amount: 50
};

@Inject
export function items() {
    var rows = [];

    for (var i = itemsOptions.amount; i > 0; --i) {
        rows.unshift({
            id: i,
            title: 'Item title ' + i,
            body: 'Item body ' + i
        });
    }

    return rows;
}

@Inject(items)
export function itemExists(items) {
    return function(id) {
        return !!items[id -1];
    };
}

@Inject(items)
export function getItem(items) {
    return function(id) {
        return items[id -1];
    };
}