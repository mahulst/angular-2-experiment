import {TemplateDirective, BoundViewFactory, ViewPort, AttachAware} from 'templating';
import {Inject} from 'di';

export class TitleBar {
    constructor() {
        this.content = [];
    }

    addContent(content) {
        this.content.push(content);
    }

    removeContent(content) {
        var index = this.content.indexOf(content);
        if (index > -1) {
            this.content.splice(index, 1);
        }
    }
}

@TemplateDirective({selector: 'title-bar-content'})
@Inject(TitleBar, BoundViewFactory, 'executionContext')
@AttachAware
export class TitleBarContent {
    constructor(titleBar, viewFactory, context) {
        this.titleBar = titleBar;
        this.content = {
            viewFactory: viewFactory,
            context: context
        };
    }

    diAttached() {
        this.titleBar.addContent(this.content);
    }

    diDetached() {
        this.titleBar.removeContent(this.content);
    }
}

@TemplateDirective({selector: 'title-bar-view-port'})
@Inject(ViewPort, TitleBar)
export class TitleBarViewPort {
    constructor(viewPort, titleBar) {
        this.viewPort = viewPort;
        this.titleBar = titleBar;
        Object.observe(this.titleBar.content, () => {
            this.viewFactoriesChanged();
        });
    }

    viewFactoriesChanged() {
        if (this.attachedView) {
            this.attachedView.remove();
        }

        this.attachedContent = this.titleBar.content[this.titleBar.content.length - 1];
        this.attachedContent.viewFactory.viewPort = this.viewPort;

        this.attachedView = this.attachedContent.viewFactory.createView({
            executionContext: this.attachedContent.context
        });

        this.attachedView.appendTo(this.viewPort);

        // TODO: The view port that shares its execution context with <title-bar-content> is not flushing
        // at the appropriate moments (e.g., when using [on-click=""] while appended to <title-bar-view-port>)
    }
}