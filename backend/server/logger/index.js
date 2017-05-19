import chalk from 'chalk';

export default {
    log: (color, ...messages) => {
        console.log(chalk[color](messages));
    },
    error: (...messages) => {
        console.log(chalk.red(messages));
    },
    info: (...messages) => {
        console.log(chalk.blue(messages));
    },
    success: (...messages) => {
        console.log(chalk.green(messages));
    }
};
