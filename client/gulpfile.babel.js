"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";

gulp.task("default",["transpile"]);

gulp.task("transpile", () => {

	return browserify("src/app.js")
	.transform("babelify")
	.bundle()
  .on("error",function(error){
    console.log(console.error("\nError: ",error.message, "\n"));
  })
	.pipe(source("bundle.js"))
	.pipe(gulp.dest("dist"));
});

gulp.task("watch", ["transpile"], () => {
  gulp.watch("src/**/*", ["transpile"]);
});
