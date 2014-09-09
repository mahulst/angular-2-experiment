import {ComponentDirective} from 'templating';
import {AppRouter} from 'router';

@ComponentDirective
export class App {
    constructor(router:AppRouter) {
        this.router = router;
        this.router.configure(config => {
            config.title = document.title;

            config.map([
                { pattern: [''], componentUrl: 'routes/overview', title: 'Overview' }
            ]);
        });
    }
}