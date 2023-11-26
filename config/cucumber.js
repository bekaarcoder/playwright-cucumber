console.log('ENV: ', process.env.ENV);
console.log('TAGS: ', process.env.TAGS);

module.exports = {
    default: {
        tags: process.env.TAGS || '',
        formatOptions: {
            snippetInterface: 'async-await',
        },
        paths: ['src/test/features/'],
        publishQuiet: false,
        dryRun: false,
        require: ['src/test/steps/*.ts', 'src/hooks/hooks.ts'],
        requireModule: ['ts-node/register'],
        format: [
            'progress-bar',
            'html:test-results/cucumber-report.html',
            'json:test-results/cucumber-report.json',
            'rerun:@rerun.txt',
        ],
        parallel: 2,
    },
    rerun: {
        formatOptions: {
            snippetInterface: 'async-await',
        },
        publishQuiet: false,
        dryRun: false,
        require: ['src/test/steps/*.ts', 'src/hooks/hooks.ts'],
        requireModule: ['ts-node/register'],
        format: [
            'progress-bar',
            'html:test-results/cucumber-report.html',
            'json:test-results/cucumber-report.json',
            'rerun:@rerun.txt',
        ],
        parallel: 2,
    },
};
