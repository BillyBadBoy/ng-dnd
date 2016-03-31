module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
	jshint: {
		dndFiles: ['src/*.js']
	},        
	uglify: {
            all_src : {
                options : {
                    preserveComments: 'some'
                },
                files : {
                    'examples/dnd-all-min.js' : [
                        'src/dndMod.js',
                        'src/dndData.js',
                        'src/dndDraggable.js',
                        'src/dndDroppable.js'
                    ],
                    'examples/ios-dnd-min.js' : [
                        'lib/ios-drag-drop.js'
                    ]
                }
            }
        },
	connect: {
		server: {
			options: {
				port: 8080,
				base: './examples',
				open: true,
				hostname: '*',				
				keepalive: true
			}
		}
	}
});
    
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'jshint' ]);
    grunt.registerTask('serve',   ['uglify', 'connect']);
};
