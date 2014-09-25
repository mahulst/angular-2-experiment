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

@TemplateDirective({
    selector: 'title-bar-content'
})
@AttachAware
@Inject(TitleBar, BoundViewFactory, 'executionContext')
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

@TemplateDirective({
    selector: 'title-bar-view-port',
    observe: {
        'titleBar.content[]': 'contentChanged'
    }
})
@Inject(ViewPort, TitleBar)
export class TitleBarViewPort {
    constructor(viewPort, titleBar) {
        this.viewPort = viewPort;
        this.titleBar = titleBar;
    }

    contentChanged() {
        var oldContent;
        if (this.content) {
            oldContent = this.content;
        }
        this.content = this.titleBar.content[this.titleBar.content.length - 1];

        if (this.content !== oldContent) {
            if (this.view) {
                this.view.remove();
            }
            if (this.content) {
                // TODO: The view port sharing its execution context with <title-bar-content> is not flushing
                // when event handlers (e.g., [on-click]) are used while appended to <title-bar-view-port>
                this.content.viewFactory.viewPort = this.viewPort;
                this.view = this.content.viewFactory.createView({
                    executionContext: this.content.context
                });
                this.view.appendTo(this.viewPort);
            }
        }
    }
}