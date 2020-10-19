class WPService {
    /*
    layout will be {desktop, tablet, mobile}
    will need to pass in current device to getPageData to filter out the other layouts
    */
    getPageData() {
        return Promise.resolve({
            then: function(onFulfill){
                onFulfill({
                    id: null,
                    type: "main",
                    styles: {padding: '10px'},
                    html: null,
                    layout: null,
                    children: [
                        {
                            id: 12345,
                            type: "hero",
                            styles: {},
                            html: "<h1>24/7 Emergency Services</h1>",
                            layout: {
                                fullscreen: true,
                                row: 1,
                                column: 1,
                                span: 12
                            },
                            children: []
                        },
                        {
                            id: 12346,
                            type: "call_to_action",
                            styles: {},
                            html: "<h2>Quality</h2><p>Electricity is a very important part of our life. We can't imagine it without home appliances",
                            layout: {
                                fullscreen: false,
                                row: 2,
                                column: 1,
                                span: 4
                            },
                            children: []
                        },
                        {
                            id: 12347,
                            type: "call_to_action",
                            styles: {},
                            html: "<h2>Domestic &amp; Commercial</h2><p>Plumbing is such a sphere in our houses that it requires some professional skills and manpower</p>",
                            layout: {
                                fullscreen: false,
                                row: 2,
                                column: 5,
                                span: 4
                            },
                            children: []
                        },
                        {
                            id: 12348,
                            type: "call_to_action",
                            styles: {},
                            html: "<h2>Cost</h2><p>We have experience in painting any surface from new construction to cabinets in commercial properties</p>",
                            layout: {
                                fullscreen: false,
                                row: 2,
                                column: 9,
                                span: 4
                            },
                            children: []
                        },
                        {
                            id: 12349,
                            type: "container",
                            styles: {},
                            html: "",
                            layout: {
                                fullscreen: false,
                                row: 3,
                                column: 1,
                                span: 12
                            },
                            children: [
                                {
                                    id: 23456,
                                    type: "content",
                                    styles: {},
                                    html: "<h2>Why Choose Renovate</h2><p>We value our every worker and every client, and we strive to do our best to provide you with the best services ever.</p>",
                                    layout: {
                                        fullscreen: false,
                                        row: 1,
                                        column: 1,
                                        span: 12
                                    },
                                    children: []
                                },
                                {
                                    id: 23457,
                                    type: "content",
                                    styles: {},
                                    html: "<h3>Window Frame Repair</h3><p>When it comes to electrical repair, JohnnyGo has years of experience that ensures we'll provide expert solutions for electrical problems.</p>",
                                    layout: {
                                        fullscreen: false,
                                        row: 2,
                                        column: 1,
                                        span: 4
                                    },
                                    children: []
                                },
                                {
                                    id: 23458,
                                    type: "content",
                                    styles: {},
                                    html: "<h3>Window Installation and Repair</h3><p>We have a skilled expert who deals with plumbing everyday and will gladly help you.</p>",
                                    layout: {
                                        fullscreen: false,
                                        row: 2,
                                        column: 5,
                                        span: 4
                                    },
                                    children: []
                                },
                                {
                                    id: 23459,
                                    type: "content",
                                    styles: {},
                                    html: "<h3>Window Shutter Installation</h3><p>To eliminate malfunctions and ensure you with comfortable temperatures, our experts constantly improve their skills and get new knowledge.</p>",
                                    layout: {
                                        fullscreen: false,
                                        row: 2,
                                        column: 9,
                                        span: 4
                                    },
                                    children: []
                                },
                                {
                                    id: 23462,
                                    type: "content",
                                    styles: {},
                                    html: "<h3>Replacement Window Shades</h3><p>When it comes to electrical repair, JohnnyGo has years of experience that ensures we'll provide expert solutions for electrical problems.</p>",
                                    layout: {
                                        fullscreen: false,
                                        row: 3,
                                        column: 1,
                                        span: 4
                                    },
                                    children: []
                                },
                                {
                                    id: 23460,
                                    type: "content",
                                    styles: {},
                                    html: "<h3>Secondary Double Glazing</h3><p>If you need to maintain your garden, to mow the grass, prune the trees and do other landscaping, our gardnener knows about it a lot.</p>",
                                    layout: {
                                        fullscreen: false,
                                        row: 3,
                                        column: 5,
                                        span: 4
                                    },
                                    children: []
                                },
                                {
                                    id: 23461,
                                    type: "content",
                                    styles: {},
                                    html: "<h3>Bi-folding Doors</h3><p>Our hour constantly requires some maintenance. If you are tired of all these little breakdowns that don't let you feel yourself cozy</p>",
                                    layout: {
                                        fullscreen: false,
                                        row: 3,
                                        column: 9,
                                        span: 4
                                    },
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            )}
        });
    }

    setPageData() {}
}

export default WPService;