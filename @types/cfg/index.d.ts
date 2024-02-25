import { HelmetOptions } from 'helmet';

declare module 'cfg' {
    interface Config {
        /** API settings */
        api: {
            host: string;
            method: {};
            timeout: number;
        };
        /**
         * Option for environment detection
         */
        environment: string;

        /**
         * Options for helmet middleware
         *
         * Source code:
         * https://github.com/helmetjs/helmet
         */
        helmet?: HelmetOptions;

        /** Languages for which source code should be built */
        langs: string[];

        /** Render options */
        render?: {
            /** Turns hot module replacement */
            isHot: boolean;
        };

        /** Static content (built css and js, images, etc) options */
        static: {
            /** Base url for static content (e.g. https://yastatic.net/s3/project-stub/) */
            baseUrl: string;

            /** Directory for the built static content */
            dir: string;

            /** Path to frozen (version agnostic) static content (e.g. "_") */
            frozenPath: string;

            /** Directory for static files, which should be served from / */
            staticDir: string;

            /** Path to version static content (usually picked from env) */
            version: string;
        };
    }

    type RecursivePartial<T> = {
        [P in keyof T]?: RecursivePartial<T[P]>;
    };

    export type AppConfig = RecursivePartial<Config>;
}
