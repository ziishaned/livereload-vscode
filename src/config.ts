import * as _ from 'lodash';
import { workspace } from 'vscode';

const DEFAULT_EXTS: string[] = 'html htm css js png gif jpg php php5 py rb erb coffee twig'.split(' ');
const DEFAULT_EXCLUSIONS: string[] = '.DS_Store .gitignore .git .svn .hg'.split(' ');

export default function () {
    let config = {
        debug: workspace.getConfiguration().get('livereload.debug') || false,

        port: workspace.getConfiguration().get('livereload.port') || 35729,

        https: workspace.getConfiguration().get('livereload.useHTTPS') ? {} : null,

        applyCSSLive: workspace.getConfiguration().get('livereload.applyCSSLive') || true,

        applyImageLive: workspace.getConfiguration().get('livereload.applyImageLive') || true,

        delayForUpdate: workspace.getConfiguration().get('livereload.delayForUpdate') || 0,

        exts: workspace.getConfiguration().get('livereload.exts') ? _.split(workspace.getConfiguration().get('livereload.exts'), ',') : '',

        exclusions: workspace.getConfiguration().get('livereload.exclusions') ? _.split(workspace.getConfiguration().get('livereload.exclusions'), ',') : ''
    };

    config.exts = _.chain(config.exts).map(ext => ext.trim()).concat(DEFAULT_EXTS).uniq().value();

    config.exclusions = _.chain(config.exclusions).map(ex => ex.trim()).concat(DEFAULT_EXCLUSIONS).uniq().value();

    return config;
}