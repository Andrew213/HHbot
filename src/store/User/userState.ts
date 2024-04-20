export type resumeT = {
    id: string;
    title: string;
    alternate_url: string;
};

export type userT = {
    id: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email?: string;
    resumes_url?: string;
    resumeList?: resumeT[];
    counter?: {
        new_resume_views: number;
        unread_negotiations: number;
        resumes_count: number;
    };
};

export type userStateT = {
    user: userT;
    loading: boolean;
    errMsg: string;
};
