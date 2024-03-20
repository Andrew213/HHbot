/* eslint-disable no-useless-escape */
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import hosts from '../configs/hosts.json';

const addAliases = (
    aliases: { host: string; ip: string }[],
    prefix?: string
) => {
    const currentHosts: string = readFileSync('/etc/hosts').toString();

    const newHosts = aliases
        .reduce(
            (result, { host, ip }) => {
                if (currentHosts.includes(host)) {
                    console.warn(
                        `warn: host ${host} is already exists in /etc/hosts`
                    );
                    return result;
                }
                return [...result, `${ip} ${host}`];
            },
            [
                [
                    `############\n### express-host-aliases\n${
                        prefix ? `### service: ${prefix}\n` : ''
                    }`
                ]
            ]
        )
        .concat('\n############\n');

    if (newHosts.length > 2) {
        execSync(`sudo sh -c "echo \'${newHosts.join('\n')}\' >> /etc/hosts"`);
    }
};

addAliases(hosts, 'ssr-vue-express');
