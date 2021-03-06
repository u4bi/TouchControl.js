import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
    entry: './src/App.js',
    dest: './dist/TouchControl.js',
    format: 'umd',
    moduleName: 'TouchControl',
    sourceMap: 'inline',
    plugins: [
        uglify({}, minify)
    ]
};