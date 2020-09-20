const presets = [
    ['@babel/preset-typescript'],
    ['@babel/preset-react'],
];
const plugins = [
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-class-properties'],
    // ['@babel/plugin-transform-modules-commonjs'],
    ['@babel/plugin-transform-arrow-functions'],
    ['@babel/plugin-transform-object-assign'],
];
module.exports = {
        presets,
        plugins,
        ignore: [/\/node_modules\//],
}
