export const contentTypes = [
    {
        title: 'Hero',
        type: 'hero',
        styles: {},
        html: '<h1>This is the hero title</h1>',
        layout: {
            fullscreen: true,
        },
        children: []
    },
    {
        title: 'Content',
        type: 'content',
        styles: {},
        html: '<p>This is content</p>',
        layout: {
            fullscreen: false,
        },
        children: []
    },
    {
        title: 'Container',
        type: 'container',
        styles: {padding: '10px'},
        html: null,
        layout: {
            fullscreen: false,
        },
        children: [
            {
                type: "content",
                styles: {},
                html: "This is content inside of a container",
                layout: {
                    fullscreen: false,
                    row: 1,
                    column: 1,
                    span: 12
                },
                children: []
            }
        ]
    },
];